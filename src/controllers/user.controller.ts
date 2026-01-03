import { Request, Response } from "express";
import * as userService from "../services/user.service";


// ===============================
// Get all users
// ===============================
export const getAllUsers = async (req: Request, res: Response) => {
  console.log("🔥 getAllUsers controller HIT");

  try {
    const users = await userService.getAllUsers();
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("getAllUsers error:", error);
    res.status(500).json({ success: false });
  }
};


// ===============================
// Get user by id
// ===============================
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(Number(req.params.id));
    if (!user) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("getUserById error:", error);
    res.status(500).json({ success: false });
  }
};

// ===============================
// Create user
// ===============================
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("createUser error:", error);
    res.status(500).json({ success: false });
  }
};

// ===============================
// Update user by id
// ===============================
export const updateUserById = async (req: Request, res: Response) => {
  try {
    const user = await userService.updateUserById(
      Number(req.params.id),
      req.body
    );

    if (!user) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("updateUserById error:", error);
    res.status(500).json({ success: false });
  }
};

// ===============================
// Delete user by id
// ===============================
export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const success = await userService.deleteUserById(
      Number(req.params.id)
    );

    if (!success) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("deleteUserById error:", error);
    res.status(500).json({ success: false });
  }
};
