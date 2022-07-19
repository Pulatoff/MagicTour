const express = require("express");
const router = express.Router({ mergeParams: true });
const controller = require("../controller/reviewController");

router.route("/").get(controller.getAllReviews).post(controller.addReview);
router
  .route("/:id")
  .get(controller.getOneReview)
  .patch(controller.updateReview)
  .delete(controller.deleteReview);

module.exports = router;
