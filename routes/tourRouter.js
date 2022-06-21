const express = require("express");
const tourRouter = express.Router();
const tourController = require("../controller/tourController");

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

tourRouter.route("/stats").get(tourController.tourStats);

tourRouter
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = tourRouter;
