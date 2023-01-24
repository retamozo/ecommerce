import { Router } from "express";
import { createOrderSchema, getOrderSchema, addItemSchema } from "@schemas/order.schema";
import { validatorHandler } from "@middlewares/validator.handler";
import { OrderService } from "@services/order.service";

const router = Router();

const validateCreateOrder = validatorHandler(createOrderSchema, "body");

const validateGetOrder = validatorHandler(getOrderSchema, "params");

const validateAddItem = validatorHandler(addItemSchema, "body")

const orderService = new OrderService();


router.post("/", validateCreateOrder, async (req, res, next) => {
  try {
    const body = req.body;
    const customer = await orderService.create(body);
    res.status(201).json({
      message: "created",
      customer,
    });
  } catch (e) {
    next(e);
  }
});

router.post("/add-item", validateAddItem, async (req, res, next) => {
  try {
    const body = req.body;
    const item = await orderService.addItem(body);
    res.status(201).json({
      message: "created",
      item,
    });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", validateGetOrder, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await orderService.findOne(id);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", validateGetOrder, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedResponse = await orderService.delete(id);
    res.json(deletedResponse);
  } catch (e) {
    next(e);
  }
});


export default router;

