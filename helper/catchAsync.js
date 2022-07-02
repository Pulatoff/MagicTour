const AppError = require("./appError");

const catchErrorAsync = (funksiya) => {
  return (req, res, next) => {
    funksiya(req, res, next).catch((err) =>
      next(new AppError(err.message, 404))
    );
  };
};

module.exports = catchErrorAsync;
