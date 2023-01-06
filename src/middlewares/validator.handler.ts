import { badRequest } from "@hapi/boom"

export const validatorHandler = (schema, property) => (req, res, next) => {
  const field = req[property];
  const { error } = schema.validate(field, {
    abortEarly: false, // throw all possible erros in one shoot
  });
  if (error) {
    next(badRequest(error));
  }
  next();
};

