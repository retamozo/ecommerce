import { Router } from 'express';
import {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema
} from '@schemas/category.schema';
import { validatorHandler } from '@middlewares/validator.handler';
import { FieldSource } from '@custom-types/schemas';
import {
  createCategoryController,
  deleteCategory,
  getAllCategoriesController,
  patchCategoryController
} from '@controllers/category';

const router = Router();

const validateCreateCategory = validatorHandler(
  createCategorySchema,
  FieldSource.Body
);

const validateGetCategorySchema = validatorHandler(
  getCategorySchema,
  FieldSource.Params
);

const validatePartialCategoryUpdate = [
  validatorHandler(getCategorySchema, FieldSource.Params),
  validatorHandler(updateCategorySchema, FieldSource.Body)
];

router.get('/', getAllCategoriesController);

router.get('/:id', validateGetCategorySchema, getAllCategoriesController);

router.post('/', validateCreateCategory, createCategoryController);

router.patch('/:id', validatePartialCategoryUpdate, patchCategoryController);

router.delete('/:id', validateGetCategorySchema, deleteCategory);

export default router;
