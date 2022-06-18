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

const tourStats = async (req, res) => {
  try {
    const data = await tourModel.aggregate([
      {
        $match: {
          price: { $gte: 5 },
        },
      },
      {
        $group: {
          _id: { $toUpper: "$difficulty" },
          numbersTour: { $sum: 1 },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
          avgRating: { $avg: "$ratingsAverage" },
        },
      },
      {
        $sort: {
          avgPrice: 1,
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    res.status(200).json({
      status: "succes",
      results: data.length,
      data: data,
    });
  } catch (e) {
    res.status(404).json({
      status: "succes",
      data: e.message,
    });
  }
};

const tourReportYear = async (req, res) => {
  try {
    const data = await tourModel.aggregate([
      {
        $unwind: "$startDates",
      },
      {
        $match: {
          startsDates: {
            $gte: new Date(`${req.params.year}-01-01`),
            $lte: new Date(`${req.params.year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: {
            $month: "$startDates",
          },
          tourlarSoni: {
            $sum: 1,
          },
          tourNomi: {
            $push: "$name",
          },
        },
      },
      {
        $addFields: { Oynomi: "$_id" },
      },
      {
        $project: { _id: 0 },
      },
      {
        $sort: {
          tourlarSoni: 1,
        },
      },
      {
        $limit: 2,
      },
    ]);
    res.status.json({
      status: "succes",
      results: data.length,
      data: data,
    });
  } catch (e) {
    res.status(404).json({
      status: "failed",
      message: e.message,
    });
  }
};

module.exports = {
  getAllTours,
  getTour,
  addTours,
  deleteTour,
  updateTour,
  tourStats,
};
