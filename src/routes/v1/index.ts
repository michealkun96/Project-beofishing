import { Router } from "express";
import productRoute from "./product.route";
import userRoute from "./user.route";

const router = Router();

router.use("/products", productRoute);
router.use("/users", userRoute);

export default router;
