import { Request, Response } from 'express';
import * as categoryService from '../services/category.service';

// GET /categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    return res.status(200).json(categories);
  } catch (error) {
    console.error('❌ Get categories error:', error);
    return res.status(500).json({
      message: 'Failed to get categories',
    });
  }
};

// POST /categories
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, slug, parent_id, description, is_active } = req.body;

    // Validate required fields
    if (!name || !slug) {
      return res.status(400).json({
        message: 'Name and slug are required',
      });
    }

    const category = await categoryService.createCategory({
      name,
      slug,
      parent_id,
      description,
      is_active,
    });

    return res.status(201).json(category);
  } catch (error) {
    console.error('❌ Create category error:', error);
    return res.status(500).json({
      message: 'Failed to create category',
    });
  }
};
