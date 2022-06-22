module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 404;
  err.status = err.status || "fail";
  err.message = err.message || "Not found";
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      message: err.message,
      stasusCode: err.statusCode,
      stack: err.stack,
      status: err.status,
    });
  } else if (process.env.NODE_ENV === "PRODUCTION") {
    res.status(err.statusCode).json({
      message: err.message,
      status: err.status,
    });
  }
  next();
};
