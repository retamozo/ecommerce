import {
  AddItemSchema,
  CreateOrderSchema,
  GetOrderSchema
} from '@custom-types/schemas';
import Joi from 'joi';

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

export const getOrderSchema = Joi.object<GetOrderSchema>({
  id: id.required()
});

export const createOrderSchema = Joi.object<CreateOrderSchema>({
  customerId: customerId.required()
});

export const addItemSchema = Joi.object<AddItemSchema>({
  productId: productId.required(),
  amount: amount.required()
});
