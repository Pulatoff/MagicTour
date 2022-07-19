const catchErrorAsync = require("../helper/catchAsync");
const APIFeatures = require("../helper/APIFeatures");

const response = (res, statusCode, data) => {
  if (Array.isArray(data)) {
    res.status(statusCode).json({
      status: "success",
      length: data.length,
      data: data,
    });
  } else {
    res.status(statusCode).json({
      status: "success",
      data: data,
    });
  }
};

exports.getAll = catchErrorAsync(async (req, res, next, Model, options) => {
  const features = new APIFeatures(req.query, Model)
    .filter()
    .field()
    .sort()
    .pagination();
  const data = await features.dbQuery;
  response(res, 200, data);
});

exports.getOne = catchErrorAsync(async (req, res, next, Model) => {
  if (options) {
    const data = await Model.findById(req.params.id).populate(options);
    response(res, 200, data);
  } else {
    const data = await Model.findById(req.params.id);
    response(res, 200, data);
  }
});
exports.add = catchErrorAsync(async (req, res, next, Model) => {
  const data = await Model.create(req.body);
  response(res, 201, data);
});

exports.update = catchErrorAsync(async (req, res, next, Model) => {
  const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
    validator: true,
    new: true,
  });
  response(res, 201, data);
});

exports.delete = catchErrorAsync(async (req, res, next, Model) => {
  const data = await Model.findByIdAndDelete(req.params.id);
  response(res, 204, data);
});
