import Joi from "joi";


const id = Joi.number().integer();
const customerId = Joi.number().integer();

export const getOrderSchema = Joi.object({
  id: id.required(),
});

export const createOrderSchema = Joi.object({
  customerId: customerId.required(),
});
