import { Router } from 'express';
import {
  createOrderSchema,
  getOrderSchema,
  addItemSchema
} from '@schemas/order.schema';
import { validatorHandler } from '@middlewares/validator.handler';
import { FieldSource } from '@custom-types/schemas';
import {
  addItemController,
  createOrderController,
  deleteItemById,
  getItemByIdController
} from '@controllers/orders';

const router = Router();

const validateCreateOrder = validatorHandler(
  createOrderSchema,
  FieldSource.Body
);

const validateGetOrder = validatorHandler(getOrderSchema, FieldSource.Params);

const validateAddItem = validatorHandler(addItemSchema, FieldSource.Body);

router.post('/', validateCreateOrder, createOrderController);

router.post('/:id/items', validateAddItem, addItemController);

router.get('/:id', validateGetOrder, getItemByIdController);

router.delete('/:id', validateGetOrder, deleteItemById);

export default router;
