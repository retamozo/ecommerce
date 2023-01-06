export const logErrors = (error, req, res, next) => {
  next(error);
};

export const errorHandler = (error, req, res, next) => {
  return res.status(500).json({
    error: error.message,
    stack: error.stack,
  });
};

export const boomErrorHandler = (error, req, res, next) => {
  if (error.isBoom) {
    const { output } = error;
    return res.status(output.statusCode).json(output.payload);
  }
  next(error);
};

