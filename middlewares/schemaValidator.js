const boom = require('@hapi/boom');

const validatorHandler = (schema, property) => (req, res, next) => {
  const field = req[property];
  const { error } = schema.validate(field, {
    abortEarly: false, // throw all possible erros in one shoot
  });
  if (error) {
    next(boom.badRequest(error));
  }
  next();
};

module.exports = {
  validatorHandler,
};
