import { connectDB } from "../configs/database";
import { DataSource } from "typeorm";
import { Order } from "../models/order.model";
import { User } from "../models/user.model";

let orderRepo: any;

// ===============================
// Init TypeORM repository
// ===============================
export const initOrderRepo = (dataSource: DataSource) => {
  orderRepo = dataSource.getRepository(Order);
};

// ===============================
// Create order (TypeORM)
// ===============================
export const createOrder = async (data: {
  user_id: number;
  total_amount: number;
  order_status: string;
  payment_method?: string;
  shipping_address?: string;
}) => {
  if (!orderRepo) {
    throw new Error("Order repository not initialized");
  }

  const order = orderRepo.create({
    total_amount: data.total_amount,
    order_status: data.order_status,
    payment_method: data.payment_method ?? null,
    shipping_address: data.shipping_address ?? null,
    user: { id: data.user_id } as User,
  });

  return orderRepo.save(order);
};

// ===============================
// Get all orders (MSSQL raw)
// ===============================
export const getAllOrders = async () => {
  const pool = await connectDB();

  const result = await pool.request().query(`
    SELECT
      o.id,
      o.total_amount,
      o.order_status,
      o.payment_method,
      o.shipping_address,
      o.created_at,
      u.id AS user_id,
      u.full_name,
      u.email
    FROM orders o
    JOIN users u ON o.user_id = u.id
    ORDER BY o.id DESC
  `);

  return result.recordset;
};

// ===============================
// Get orders by user id
// ===============================
export const getOrdersByUserId = async (userId: number) => {
  const pool = await connectDB();

  const result = await pool
    .request()
    .input("userId", userId)
    .query(`
      SELECT
        o.*,
        u.full_name,
        u.email
      FROM orders o
      JOIN users u ON o.user_id = u.id
      WHERE o.user_id = @userId
      ORDER BY o.id DESC
    `);

  return result.recordset;
};

// ===============================
// Get order by id
// ===============================
export const getOrderById = async (orderId: number) => {
  const pool = await connectDB();

  const result = await pool
    .request()
    .input("orderId", orderId)
    .query(`
      SELECT
        o.*,
        u.full_name,
        u.email
      FROM orders o
      JOIN users u ON o.user_id = u.id
      WHERE o.id = @orderId
    `);

  return result.recordset[0];
};
