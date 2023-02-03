import { CategorySchema } from '@custom-types/schemas';
import Joi from 'joi';

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const image = Joi.string().uri();

export const createCategorySchema = Joi.object<CategorySchema>({
  name: name.required(),
  image: image.required()
});

export const updateCategorySchema = Joi.object<CategorySchema>({
  name: name,
  image: image
});

export const getCategorySchema = Joi.object<{ id: string }>({
  id: id.required()
});
