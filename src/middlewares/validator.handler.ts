import { FieldSource, SchemaToValidate } from '@custom-types/schemas';
import { badRequest } from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';

export const validatorHandler =
  (schema: SchemaToValidate, property: FieldSource) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const field = req[property];
    const { error } = schema.validate(field, {
      abortEarly: false // throw all possible erros in one shoot
    });
    if (error) {
      next(badRequest(error.message));
    }
    next();
  };
