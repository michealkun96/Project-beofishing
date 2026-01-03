import { Request, Response } from "express";
import * as orderService from "../services/order.service";

// ===============================
// Get all orders
// ===============================
export const getAllOrders = async (req: Request, res: Response) => {
  console.log("🔥 GET /orders HIT");

  try {
    const orders = await orderService.getAllOrders();
    res.json({ success: true, data: orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

// ===============================
// Get order by id
// ===============================
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await orderService.getOrderById(
      Number(req.params.id)
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("getOrderById error:", error);
    res.status(500).json({ success: false });
  }
};

// ===============================
// Get orders by user id
// ===============================
export const getOrdersByUserId = async (
  req: Request,
  res: Response
) => {
  try {
    const orders = await orderService.getOrdersByUserId(
      Number(req.params.userId)
    );

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("getOrdersByUserId error:", error);
    res.status(500).json({ success: false });
  }
};

// ===============================
// Create order
// ===============================
export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await orderService.createOrder(req.body);

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("createOrder error:", error);
    res.status(500).json({ success: false });
  }
};
