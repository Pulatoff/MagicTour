const AppError = require("./appError");

const catchErrorAsync = (funksiya) => {
  return (req, res, next, Model, options) => {
    funksiya(req, res, next, Model, options).catch((err) =>
      next(new AppError(err.message, 404))
    );
  };
};

module.exports = catchErrorAsync;
