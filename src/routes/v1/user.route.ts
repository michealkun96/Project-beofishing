import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} from "../../controllers/user.controller";

const router = Router();

// GET /users
router.get("/", getAllUsers);

// GET /users/:id
router.get("/:id", getUserById);

// POST /users
router.post("/", createUser);

// PUT /users/:id
router.put("/:id", updateUserById);

// DELETE /users/:id
router.delete("/:id", deleteUserById);

export default router;
