const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");
userRouter.route("/").get(userController.getUsers).post(userController.addUser);
userRouter
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
