import productRouter from "@routes/products.router";
import categoriesRouter from "@routes/categories.router";
import usersRouter from "@routes/users.router";
import customerRouter from "@routes/customers.router";
import ordersRoute from "@routes/orders.router";
import { Router } from "express";

const router = (app) => {
  const router = Router();
  app.get("/", (_, res) => res.send("aloha"));
  app.use("/api/v1", router);
  router.use("/products", productRouter);
  router.use("/categories", categoriesRouter);
  router.use("/users", usersRouter);
  router.use("/customers", customerRouter);
  router.use("/orders", ordersRoute)
};

export default router;
