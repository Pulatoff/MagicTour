const express = require("express");
const router = express.Router();
const controller = require("../controller/reviewController");
router.route("/").get(controller.getAllReviews).post(controller.addReview);

module.exports = router;
