import { connectDB } from "../configs/database";
import { User } from "../models/user.model";
import { DataSource } from "typeorm";

let userRepo: any;

// ===============================
// Init TypeORM repository
// ===============================
export const initUserRepo = (dataSource: DataSource) => {
  userRepo = dataSource.getRepository(User);
};

// ===============================
// Create user (TypeORM)
// ===============================
export const createUser = async (data: any) => {
  if (!userRepo) {
    throw new Error("User repository not initialized");
  }

  const user = userRepo.create({
    full_name: data.full_name ?? null,
    email: data.email ?? null,
    phone: data.phone ?? null,
    password: data.password,
    role: data.role,
    is_active: data.is_active ?? true,
  });

  return userRepo.save(user);
};

// ===============================
// Get all users (RAW SQL)
// ===============================
export const getAllUsers = async () => {
  const pool = await connectDB();

  const result = await pool.request().query(`
    SELECT *
    FROM users
    ORDER BY id DESC
  `);

  return result.recordset;
};


// ===============================
// Get user by id (RAW SQL)
// ===============================
export const getUserById = async (id: number) => {
  const pool = await connectDB();

  const result = await pool
    .request()
    .input("id", id)
    .query(`
      SELECT
        id,
        full_name,
        email,
        phone,
        role,
        is_active,
        created_at
      FROM users
      WHERE id = @id
    `);

  return result.recordset[0];
};

// ===============================
// Update user by id (TypeORM)
// ===============================
export const updateUserById = async (id: number, data: any) => {
  if (!userRepo) {
    throw new Error("User repository not initialized");
  }

  const user = await userRepo.findOne({ where: { id } });
  if (!user) return null;

  userRepo.merge(user, {
    full_name: data.full_name ?? user.full_name,
    email: data.email ?? user.email,
    phone: data.phone ?? user.phone,
    role: data.role ?? user.role,
    is_active: data.is_active ?? user.is_active,
  });

  return userRepo.save(user);
};

// ===============================
// Delete user by id (TypeORM)
// ===============================
export const deleteUserById = async (id: number) => {
  if (!userRepo) {
    throw new Error("User repository not initialized");
  }

  const user = await userRepo.findOne({ where: { id } });
  if (!user) return null;

  await userRepo.remove(user);
  return true;
};
