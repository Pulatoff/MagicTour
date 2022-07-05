const User = require("../model/userModel");
const catchErrorAsync = require("../helper/catchAsync");
const bcrypt = require("bcryptjs");
const AppError = require("../helper/appError");
const jwt = require("jsonwebtoken");

const getUsers = catchErrorAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: "sucess",
    data: users,
  });
});

const addUser = catchErrorAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("Bunday user mavjud emas", 404));
  }
  res.status(201).json({
    status: "success",
    data: user,
  });
});
async function deleteUser(req, res) {
  try {
    res.status(200).json({
      message: "halli tayor emas",
    });
  } catch (e) {}
}
async function updateUser(req, res) {
  try {
    res.status(200).json({
      message: "halli tayor emas",
    });
  } catch (e) {}
}
async function getUser(req, res) {
  try {
    res.status(200).json({
      message: "halli tayor emas",
    });
  } catch (e) {}
}

const updateMePassword = catchErrorAsync(async (req, res, next) => {
  // 1) Eski passwordni bilish kerak
  const user = await User.findById(req.body._id).select("+password");
  console.log(user);
  const tekshir = await bcrypt.compare(req.body.oldPassword, user.password);
  console.log(tekshir);
  if (!tekshir) {
    return next(new AppError("Notugri parol kiritingiz", 401));
  }
  // 2) Yangi parolni saqlaymiz

  if (req.body.newPassword !== req.body.newPasswordConfirm) {
    return next(new AppError("Siz iiki xill parol kiritingiz", 401));
  }
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPasswordConfirm;
  user.passwordChangeDate = Date.now();
  user.save();

  // token berish
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(200).json({
    status: "success",
    token: token,
  });
});

const updateMe = catchErrorAsync(async (req, res, next) => {
  // 1) Malumotlani yangilash
  const user = await User.findById(req.body._id);
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.photo = req.body.photo || user.photo;

  const newUser = await user.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
    data: newUser,
  });
});

const deleteMe = catchErrorAsync(async (req, res, next) => {
  const user = await User.findById(req.body.id).select("+active password");
  const tekshir = bcrypt.compare(req.body.password, user.password);
  if (!tekshir) {
    return next(new AppError("Siz parolni xato kiritingiz"), 401);
  }

  user.active = false;
  await user.save({ validateDeforeSave: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  addUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  updateMePassword,
  updateMe,
  deleteMe,
};
