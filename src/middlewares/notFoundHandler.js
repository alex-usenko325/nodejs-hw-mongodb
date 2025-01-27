import createError from 'http-errors';

const notFoundHandler = (_, next) => {
  next(createError(404, 'Route not found'));
};

export default notFoundHandler;
