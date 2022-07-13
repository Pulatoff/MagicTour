const Review = require("../model/reviewModel");
const AppError = require("../helper/appError");
const catchErrorAsync = require("../helper/catchAsync");

exports.getAllReviews = catchErrorAsync(async (req, res, next) => {
  const reviews = await Review.find()
    .populate({
      path: "user",
      select: "name",
    })
    .populate({
      path: "tour",
      select: "name",
    });
  res.status(200).json({
    status: "success",
    data: review,
  });
});

exports.addReview = catchErrorAsync(async (req, res, next) => {
  const review = await Review.create(req.body);
  res.status(200).json({
    status: "success",
    data: review,
  });
});
