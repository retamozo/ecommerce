import { Router } from "express";
import {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
} from "@schemas/customer.schema";
import { validatorHandler } from "@middlewares/validator.handler";
import { CustomerService } from "@services/customer.service";

const router = Router();

const validateCreateCustomer = validatorHandler(createCustomerSchema, "body");

const validateGetCustomer = validatorHandler(getCustomerSchema, "params");

const validatePartialCustomerUpdate = [
  validatorHandler(getCustomerSchema, "params"),
  validatorHandler(updateCustomerSchema, "body"),
];

const customerService = new CustomerService();

router.get("/", async (req, res, next) => {
  try {
    const customers = await customerService.find();
    res.json(customers);
  } catch (e) {
    next(e);
  }
});

router.post("/", validateCreateCustomer, async (req, res, next) => {
  try {
    const body = req.body;
    const customer = await customerService.create(body);
    res.status(201).json({
      message: "created",
      customer,
    });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", validateGetCustomer, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await customerService.findOne(id);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", validatePartialCustomerUpdate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const partialUpdate = await customerService.update(id, req.body);
    res.json(partialUpdate);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", validateGetCustomer, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedResponse = await customerService.delete(id);
    res.json(deletedResponse);
  } catch (e) {
    next(e);
  }
});

export default router;

