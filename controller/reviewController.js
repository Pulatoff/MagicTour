const Review = require("../model/reviewModel");
const AppError = require("../helper/appError");
const catchErrorAsync = require("../helper/catchAsync");

exports.getAllReviews = catchErrorAsync(async (req, res, next) => {
  if (!req.params.id) {
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
  } else {
    const data = await Review({ tour: req.params.id });
    res.status(200).json({
      status: "success",
      results: data.length,
      data,
    });
  }
});

exports.addReview = catchErrorAsync(async (req, res, next) => {
  if (!req.params.id) {
    const review = await Review.create(req.body);
    res.status(200).json({
      status: "success",
      data: review,
    });
  } else {
    const tourId = req.params.id;
    const review = await Review({
      review: req.body.review,
      rating: req.body.rating,
      tour: tourId,
      user: req.body.user,
    });
    res.status(201).json({
      data: review,
    });
  }
});
