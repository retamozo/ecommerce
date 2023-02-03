import { Router } from "express";
import { faker } from "@faker-js/faker";
import {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} from "@schemas/category.schema";
import { validatorHandler } from "@middlewares/validator.handler";
import { CategoryService } from "@services/category.service";

const router = Router();

const categoryService = new CategoryService();

const validateCreateCategory = validatorHandler(createCategorySchema, "body");

const validateGetCategorySchema = validatorHandler(getCategorySchema, "params");

const validatePartialCategoryUpdate = [
  validatorHandler(getCategorySchema, "params"),
  validatorHandler(updateCategorySchema, "body"),
];

router.get("/", async (req, res, next) => {
  try {
    const category = await categoryService.find();
    res.json(category);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", validateGetCategorySchema, async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await categoryService.findOne(id);
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.post("/", validateCreateCategory, async (req, res, next) => {
  try {
    const body = req.body;
    const newCategory = await categoryService.create(body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", validatePartialCategoryUpdate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const category = await categoryService.update(id, body);
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", validateGetCategorySchema, async (req, res, next) => {
  try {
    const { id } = req.params;
    await categoryService.delete(id);
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
});

export default router;
