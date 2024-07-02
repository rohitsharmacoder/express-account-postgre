// middleware/responseHandlers.js
const successHandler = (res, data, message = "success", statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const errorHandler = (res, error, statusCode = 500) => {
  console.error(error);
  res.status(statusCode).json({
    success: false,
    error: error.message || 'Internal Server Error',
  });
};

module.exports = {
  successHandler,
  errorHandler,
};
