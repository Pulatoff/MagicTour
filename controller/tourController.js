const Tour = require("../model/tourModel");
const handler = require("./handlerController");

const getAllTours = (req, res, next) => {
  handler.getAll(req, res, next, Tour, "guides");
};

const addTours = (req, res, next) => {
  handler.add(req, res, next, Tour);
};

const getTour = (req, res, next) => {
  handler.getOne(req, res, next, Tour, "guides");
};
const updateTour = (req, res, next) => {
  handler.update(req, res, next, Tour);
};

const deleteTour = (req, res, next) => {
  handler.delete(req, res, next, Tour);
};

module.exports = {
  getAllTours,
  getTour,
  addTours,
  deleteTour,
  updateTour,
};
