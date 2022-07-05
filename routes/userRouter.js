const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");
const authController = require("../controller/authContoller");

userRouter.route("/signup").post(authController.signup);
userRouter.route("/forgotpassword").post(authController.forgotPassword);
userRouter.route("/signin").post(authController.login);
userRouter.route("/resetpassword/:token").post(authController.resetPassword);
userRouter.route("/updatemepassword").patch(userController.updateMePassword);
userRouter.route("/updateme").patch(userController.updateMe);
userRouter.route("/deleteme").delete(userController.deleteMe);
userRouter.route("/").get(userController.getUsers).post(userController.addUser);

userRouter
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
