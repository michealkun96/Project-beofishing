import { Router } from "express";
import {
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  createOrder,
} from "../../controllers/order.controller";

const router = Router();

// ⚠️ ROUTE CỤ THỂ TRƯỚC
router.get("/user/:userId", getOrdersByUserId);

// ⚠️ ROUTE ROOT
router.get("/", getAllOrders);

// ⚠️ ROUTE ĐỘNG ĐỂ CUỐI
router.get("/:id", getOrderById);

router.post("/", createOrder);

export default router;
