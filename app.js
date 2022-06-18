const express = require("express");
const app = express();
const morgan = require("morgan");
const tourRouter = require("./routes/tourRouter");
const userRouter = require("./routes/userRouter");
// express bn server yaratish

app.use(express.json());

app.use(morgan("dev"));

app.use(express.static("public"));

app.use("/api/v1/tours", tourRouter);

app.use("/api/v1/users", userRouter);

app.use("/api/v1/tours", (req, res, next) => {
  req.time = Date.now();
  next();
});

module.exports = app;
