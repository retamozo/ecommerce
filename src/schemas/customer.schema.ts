import Joi from "joi";
import { createUserSchema } from "./user.schema";

const name = Joi.string().min(3).max(15);
const lastName = Joi.string().min(3).max(15);
const id = Joi.number().integer(); // should be an UUID?
const phone = Joi.string();
const userId = Joi.number().integer();

export const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: createUserSchema,
});

export const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  userId,
});

export const getCustomerSchema = Joi.object({
  id: id.required(),
});
