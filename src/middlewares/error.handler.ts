import { Boom, conflict, isBoom } from '@hapi/boom';
import { NextFunction, Response, Request } from 'express';
import { ValidationError } from 'sequelize';

export const logErrors = (
  error: Error,
  _req: Request,
  _res: Response,
  next: NextFunction
): void => {
  next(error);
};

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(500).json({
    error: error.message,
    stack: error.stack
  });
};

export const boomErrorHandler = (
  error: typeof Boom,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (isBoom(error)) {
    const { output } = error;
    res.status(output.statusCode).json(output.payload);
  }
  next(error);
};

export const ormError = (
  error: ValidationError,
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (error instanceof ValidationError) {
    throw conflict(error.errors[0].message);
  }
  next(error);
};
