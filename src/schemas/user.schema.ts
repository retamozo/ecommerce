import Joi from "joi";

const name = Joi.string().min(3).max(15);
const email = Joi.string().email()
const id = Joi.number().integer()
const password = Joi.string().min(8)
const role = Joi.string().min(5)

export const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role,
});

export const updateUserSchema = Joi.object({
  email,
  role
});

export const getUserSchema = Joi.object({
  id: id.required(),
});

