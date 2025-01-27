const errorHandler = (err, _, res, __) => {
  const status = err.status || 500;

  const message = err.message || 'Something went wrong';

  res.status(status).json({
    status,
    message,

    data: err.data || null,
  });
};

export default errorHandler;
