const Review = require("../model/reviewModel");
const AppError = require("../helper/appError");
const catchErrorAsync = require("../helper/catchAsync");
const handler = require("./handlerController");

exports.getAllReviews = (req, res, next) => {
  let modelReview;
  if (!req.params.id) {
    modelReview = Review.find({ tour: req.params.id });
  } else {
    modelReview = Review;
  }
  handler.getAll(req, res, next, modelReview, "tour");
};

exports.addReview = (req, res, next) => {
  handler.getAll(req, res, next, Review, "tour");
};

exports.updateReview = (req, res, next) => {
  handler.update(req, res, next, Review);
};
exports.deleteReview = (req, res, next) => {
  handler.delete(req, res, next, Review);
};

exports.getOneReview = (req, res, next) => {
  handler.getOne(req, res, next, Review);
};
