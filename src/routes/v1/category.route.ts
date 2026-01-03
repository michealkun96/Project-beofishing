import { Router } from 'express';
import {
  getCategories,
  createCategory,
} from '../../controllers/category.controller';

const router = Router();

// =======================
// CATEGORY ROUTES
// =======================

// GET /categories
router.get('/', getCategories);

// POST /categories
router.post('/', createCategory);

export default router;
