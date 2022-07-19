const express = require("express");
const tourRouter = express.Router({ mergeParams: true });
const tourController = require("../controller/tourController");
const reviewRoute = require("./reviewRouter");
tourRouter
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.addTours);

tourRouter.use(
  "/best-3-tours",
  (req, res, next) => {
    req.query.sort = "-price";
    req.query.limit = 3;
    next();
  },
  tourController.getAllTours
);

tourRouter.use("/:id/reviews", reviewRoute);

tourRouter
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = tourRouter;
