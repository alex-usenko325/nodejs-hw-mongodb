const errorHandler = (err, _, res) => {
  const status = err.status || 500;
  res.status(status).json({
    status,
    message: err.message || 'Something went wrong',
    data: err.data || null,
  });
};

export default errorHandler;
