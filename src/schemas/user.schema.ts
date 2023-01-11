import Joi from "joi";

const name = Joi.string().min(3).max(15);
const email = Joi.string().email()
const id = Joi.string()
const password = Joi.string().min(8)

export const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

export const updateUserSchema = Joi.object({
  email
});

export const getUserSchema = Joi.object({
  id: id.required(),
});

