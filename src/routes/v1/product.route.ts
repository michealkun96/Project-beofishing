import { Router } from "express";
import {
  getAllProducts,
  getProductsByCategoryId,
  getProductBySlug,
} from "../../controllers/product.controller";

const router = Router();

router.get("/", getAllProducts); 
router.get("/category/:categoryId", getProductsByCategoryId);
router.get("/:slug", getProductBySlug);


export default router;
