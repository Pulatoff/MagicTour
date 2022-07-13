const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: "tours",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("reviews", schema);
