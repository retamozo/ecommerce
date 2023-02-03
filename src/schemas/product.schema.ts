import Joi from "joi";

const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const id = Joi.number().integer();
const categoryId = Joi.number().integer();
const image = Joi.string().uri();
const description = Joi.string().min(30)

const page = Joi.number().integer()
const size = Joi.number().integer()

const price_min = Joi.number().integer()
const price_max = Joi.number().integer()

export const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required(),
  categoryId: categoryId.required()
});

export const updateProductSchema = Joi.object({
  name,
  price,
  image,
  description,
  categoryId
});

export const getProductSchema = Joi.object({
  id: id.required(),
});

export const queryProductSchema = Joi.object({
  page,
  size,
  price,
  price_min,
  price_max: price_max.when("price_min", {
    is: price_min.required(),
    then: Joi.required()
  })
})
