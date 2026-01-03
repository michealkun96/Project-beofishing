import sql from 'mssql';
import { connectDB } from '../configs/database';
import { Category } from '../models/category.model';

// =======================
// GET ALL CATEGORIES (TREE)
// =======================
export const getAllCategories = async (): Promise<Category[]> => {
  const pool = await connectDB();

  const result = await pool.request().query(`
    SELECT 
      id,
      name,
      slug,
      parent_id,
      description,
      is_active,
      created_at
    FROM categories
    WHERE parent_id IS NULL
    ORDER BY id ASC
  `);

  // Lấy children cho từng category cha
  const categories: Category[] = [];

  for (const row of result.recordset) {
    const childrenResult = await pool
      .request()
      .input('parent_id', sql.Int, row.id)
      .query(`
        SELECT 
          id,
          name,
          slug,
          parent_id,
          description,
          is_active,
          created_at
        FROM categories
        WHERE parent_id = @parent_id
        ORDER BY id ASC
      `);

    categories.push({
      ...row,
      children: childrenResult.recordset,
    });
  }

  return categories;
};

// =======================
// CREATE CATEGORY
// =======================
export const createCategory = async (
  data: Partial<Category>
): Promise<Category> => {
  const pool = await connectDB();

  // Check parent_id tồn tại
  if (data.parent_id) {
    const parentCheck = await pool
      .request()
      .input('id', sql.Int, data.parent_id)
      .query(`SELECT id FROM categories WHERE id = @id`);

    if (parentCheck.recordset.length === 0) {
      throw new Error('Parent category not found');
    }
  }

  const result = await pool
    .request()
    .input('name', sql.NVarChar(150), data.name)
    .input('slug', sql.NVarChar(160), data.slug)
    .input('parent_id', sql.Int, data.parent_id ?? null)
    .input('description', sql.NVarChar(sql.MAX), data.description ?? null)
    .input('is_active', sql.Bit, data.is_active ?? true)
    .query(`
      INSERT INTO categories (
        name,
        slug,
        parent_id,
        description,
        is_active,
        created_at
      )
      OUTPUT INSERTED.*
      VALUES (
        @name,
        @slug,
        @parent_id,
        @description,
        @is_active,
        GETDATE()
      )
    `);

  return result.recordset[0];
};
