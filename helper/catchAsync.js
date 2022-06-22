const AppError = require("./appError");

const catchErrorAsync = (funksiya) => {
  return (req, res, next) => {
    funksiya(req, res).catch((err) => next(new AppError(err.message, 404)));
  };
};

module.exports = catchErrorAsync;
