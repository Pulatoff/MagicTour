const tourModel = require("../model/tourModel");
const FeaturiesAPI = require("../helper/APIFeatures");

const getAllTours = async (req, res) => {
  try {
    let allQuery = new FeaturiesAPI(req.query, tourModel)
      .filter()
      .sort()
      .field()
      .pagination();

    const tours = await allQuery.dbQuery;

    res.status(200).json({
      status: "sucess",
      results: tours.length,
      data: tours,
    });
  } catch (e) {
    res.status(404).json({
      status: "failed",
      message: e.message,
    });
  }
};

const addTours = async (req, res) => {
  try {
    const data = req.body;
    const tour = await tourModel.create(body);
    res.status(201).json({
      status: "sucess",
      data: tour,
    });
  } catch (e) {
    res.status(404).json({
      status: "failed",
      message: e.message,
    });
  }
};

const getTour = async (req, res) => {
  try {
    const tour = await tourModel.findById(req.params.id);
    res.status(200).json({
      status: "sucess",
      data: tour,
    });
  } catch (e) {}
};

const updateTour = async (req, res) => {
  try {
    const tour = await tourModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "sucess",
      data: tour,
    });
  } catch (e) {}
};

const deleteTour = async (req, res) => {
  try {
    const tour = await tourModel.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "deleted",
    });
  } catch (e) {}
};

module.exports = {
  getAllTours,
  getTour,
  addTours,
  deleteTour,
  updateTour,
};
