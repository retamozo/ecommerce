import Joi from "joi";


const id = Joi.number().integer();
const customerId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer()
const amount = Joi.number().integer().min(1)

export const getOrderSchema = Joi.object({
  id: id.required(),
});

export const createOrderSchema = Joi.object({
  customerId: customerId.required(),
});

export const addItemSchema = Joi.object({
  productId: productId.required(),
  amount: amount.required()
})
