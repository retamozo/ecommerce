import productRouter from "./products.router";
import categoriesRouter from "./categories.router";
import { Router } from "express";

const router = (app) => {
  const router = Router();
  app.get("/", (req, res) => res.send("aloha"));
  app.use("/api/v1", router);
  router.use("/products", productRouter);
  router.use("/categories", categoriesRouter);
};

export default router;
