const express = require("express");
const app = express();
const morgan = require("morgan");
const tourRouter = require("./routes/tourRouter");
const userRouter = require("./routes/userRouter");

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
  const err = {
    stasusCode: 404,
    status: "fail",
    message: `this url is not found ${req.originalUrl}`,
  };
  next(err);
});

// Global error handlings

app.use((err, req, res, next) => {
  err.stasusCode = err.statusCode || 404;
  err.status = err.status || "fail";
  err.message = err.message || "Not found";

  res.status(err.stasusCode).json({
    status: err.status,
    message: err.message,
  });
  next();
});

module.exports = app;
