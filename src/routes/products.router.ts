import {
  createCategoryController,
  deleteProductController,
  getAllCategoriesController,
  getCategoryByIdController,
  patchProductController
} from '@controllers/product';
import { FieldSource } from '@custom-types/schemas';
import { Router } from 'express';
import { validatorHandler } from '../middlewares/validator.handler';
import {
  createProductSchema,
  getProductSchema,
  updateProductSchema,
  queryProductSchema
} from '@schemas/product.schema';

const router = Router();

const validateCreateProduct = validatorHandler(
  createProductSchema,
  FieldSource.Body
);

const validateGetProductQuery = validatorHandler(
  queryProductSchema,
  FieldSource.Params
);

const validateGetProduct = validatorHandler(
  getProductSchema,
  FieldSource.Params
);

const validatePartialUpdate = [
  validatorHandler(getProductSchema, FieldSource.Params),
  validatorHandler(updateProductSchema, FieldSource.Body)
];

router.get('/', validateGetProductQuery, getAllCategoriesController);

router.get('/:id', validateGetProduct, getCategoryByIdController);

router.post('/', validateCreateProduct, createCategoryController);

router.patch('/:id', validatePartialUpdate, patchProductController);

router.delete('/:id', deleteProductController);

export default router;
