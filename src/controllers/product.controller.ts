import { Request, Response } from "express";
import * as productService from "../services/product.service";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("getAllProducts error:", error);
    res.status(500).json({ success: false });
  }
};

export const getProductBySlug = async (req: Request, res: Response) => {
  const product = await productService.getProductBySlug(req.params.slug);
  if (!product) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(product);
};

export const getProductsByCategoryId = async (
  req: Request,
  res: Response
) => {
  const products = await productService.getProductsByCategoryId(
    Number(req.params.categoryId)
  );
  res.json(products);
};
