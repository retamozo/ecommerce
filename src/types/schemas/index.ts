import Joi from 'joi';
import type { CategorySchema } from './category';
import type { CreateOrderSchema, AddItemSchema, GetOrderSchema } from './order';

export type Schemas =
  | CategorySchema
  | CreateOrderSchema
  | AddItemSchema
  | GetOrderSchema;

export type SchemaToValidate = Joi.ObjectSchema<Schemas>;

/**
 * @enum
 * Request values where the field to be validate comes from.
 */
export enum FieldSource {
  Body = 'body',
  Query = 'query',
  Headers = 'headers',
  Params = 'params'
}
