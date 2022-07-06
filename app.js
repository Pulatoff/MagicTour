const express = require("express");
const app = express();
const morgan = require("morgan");
const tourRouter = require("./routes/tourRouter");
const userRouter = require("./routes/userRouter");
const AppError = require("./helper/appError");
const errorController = require("./controller/errorController");
const rateLimt = require("express-rate-limit");
const helmet = require("helmet");
const limiter = rateLimt({
  max: 10,
  windowMs: 1 * 60 * 1000,
  message: "Siz kup surov berdingiz",
});

app.use(helmet());

app.use("/api", limiter);

app.use(express.json());

app.use(morgan("dev"));

app.use(express.static("public"));
app.use("/api/v1/tours", tourRouter);

app.use("/api/v1/users", userRouter);

app.use("/api/v1/tours", (req, res, next) => {
  req.time = Date.now();
  next();
});

app.all("*", (req, res, next) => {
  next(new AppError("this page not founddd"), 404);
});

// Global error handlings

app.use(errorController);

module.exports = app;
