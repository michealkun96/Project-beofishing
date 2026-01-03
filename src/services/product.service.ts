import { connectDB } from "../configs/database";
import { Product } from "../models/product.model";
import { DataSource } from "typeorm";
let productRepo: any;

export const initProductRepo = (dataSource: DataSource) => {
  productRepo = dataSource.getRepository(Product);
};

export const createProduct = async (data: any) => {
  if (!productRepo) {
    throw new Error("Product repository not initialized");
  }

  const product = productRepo.create({
    ...data,
    variants: data.variants,
    images: data.images
  });

  return productRepo.save(product);
};

export const getAllProducts = async () => {
  const pool = await connectDB();

  const result = await pool.request().query(`
    SELECT p.*, c.name AS category_name, c.slug AS category_slug
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE p.is_active = 1 AND p.status = 'active'
    ORDER BY p.id ASC
  `);

  return result.recordset;
};

export const getProductsByCategoryId = async (categoryId: number) => {
  const pool = await connectDB();

  const result = await pool
    .request()
    .input("categoryId", categoryId)
    .query(`
      SELECT p.*
      FROM products p
      WHERE p.category_id = @categoryId
      AND p.is_active = 1
      AND p.status = 'active'
      ORDER BY p.id ASC
    `);

  return result.recordset;
};

export const getProductBySlug = async (slug: string) => {
  const pool = await connectDB();

  const result = await pool
    .request()
    .input("slug", slug)
    .query(`
      SELECT p.*, c.name AS category_name, c.slug AS category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.slug = @slug
        AND p.is_active = 1
        AND p.status = 'active'
    `);

  return result.recordset[0];
};