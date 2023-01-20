import Joi from "joi";

const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const id = Joi.string().uuid();
const image = Joi.string().uri();
const description = Joi.string().min(30)

export const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required()
});

export const updateProductSchema = Joi.object({
  name,
  price,
  image,
  description
});

export const getProductSchema = Joi.object({
  id: id.required(),
});

