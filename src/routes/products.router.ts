import express from "express";
import { validatorHandler } from "../middlewares/validator.handler";
import {
  createProductSchema,
  getProductSchema,
  updateProductSchema,
  queryProductSchema,
} from "../schemas/product.schema";
import { ProductsService } from "../services/product.service";

const router = express.Router();

const validateCreateProduct = validatorHandler(createProductSchema, "body");

const validateGetProductQuery = validatorHandler(queryProductSchema, "params");

const validateGetProduct = validatorHandler(getProductSchema, "params");

const validatePartialUpdate = [
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
];

const productService = new ProductsService();

router.get("/", validateGetProductQuery, async (req, res, next) => {
  try {
    const products = await productService.find(req.query);
    res.json({ length: products.length, products });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", validateGetProduct, async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.findOne(id);
    res.json(product);
  } catch (e) {
    next(e);
  }
});

router.post("/", validateCreateProduct, async (req, res, next) => {
  try {
    const body = req.body;
    const newProd = await productService.create(body);
    res.status(201).json({
      message: "created",
      data: newProd,
    });
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", validatePartialUpdate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const partialUpdatedProduct = await productService.update(id, req.body);
    res.json(partialUpdatedProduct);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedResponse = await productService.delete(id);
    res.json(deletedResponse);
  } catch (e) {
    res.status(404).json({
      message: e.message,
    });
  }
});

export default router;
