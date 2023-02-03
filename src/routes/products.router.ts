import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
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

router.get('/', validateGetProductQuery, getAllProductsController);

router.get('/:id', validateGetProduct, getProductByIdController);

router.post('/', validateCreateProduct, createProductController);

router.patch('/:id', validatePartialUpdate, patchProductController);

router.delete('/:id', validateGetProduct, deleteProductController);

export default router;
