const User = require("../model/userModel");
const catchErrorAsync = require("../helper/catchAsync");

const getUsers = catchErrorAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: "sucess",
    data: users,
  });
});

async function addUser(req, res) {
  try {
    res.status(200).json({
      message: "halli tayor emas",
    });
  } catch (e) {}
}
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

module.exports = { addUser, getUser, getUsers, deleteUser, updateUser };
