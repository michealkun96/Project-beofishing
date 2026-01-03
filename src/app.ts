import express from "express";
import cors from "cors";
import morgan from "morgan";

import categoryRoutes from "./routes/v1/category.route";
import { initProductRepo } from "./services/product.service";
import userRoutes from "./routes/v1/user.route";
import { initUserRepo } from "./services/user.service";
import { initOrderRepo } from "./services/order.service";
import orderRoutes from "./routes/v1/order.route";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// init TypeORM repo (Product)
app.use((req, res, next) => {
  if (req.app.locals.dataSource) {
    initProductRepo(req.app.locals.dataSource);
    initUserRepo(req.app.locals.dataSource);
    initOrderRepo(req.app.locals.dataSource);
  }
  next();
});


//* CATEGORIES ROUTES */
app.use("/categories", categoryRoutes);

//  USER ROUTES */
app.use("/users", userRoutes);

//* ORDER ROUTES */
app.use("/orders", orderRoutes);

app.get("/", (req, res) => {
  res.json({ message: "BEO Fishing API is running 🚀" });
});

export default app;
