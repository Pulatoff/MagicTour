const tourModel = require("../model/userModel");

async function getUsers(req, res) {
  try {
    res.status(200).json({
      message: "halli tayor emas",
    });
  } catch (e) {}
}

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
