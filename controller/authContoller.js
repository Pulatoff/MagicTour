const catchErrorAsync = require("../helper/catchAsync");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const AppError = require("../helper/appError");
const bcrypt = require("bcrypt");

const signup = catchErrorAsync(async (req, res, next) => {
  console.log(req.body);
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

const login = catchErrorAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("notugri utz ruyhatdan", 401));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(
      new AppError("Bunday odam mawjud emas iltimos qayta ruyhatdan utin", 401)
    );
  }

  const tekshirish = (odiyPassword, hashPassword) => {
    return bcrypt.compare(odiyPassword, hashPassword);
  };

  if (!(await tekshirish(password, user.password))) {
    return next(new AppError("Passwordingiz hato", 404));
  }
});

const protect = catchErrorAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Siz tizimga kirishiz shart"));
  }

  const tekshir = await jwt.verify(token, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  if (!tekshir) {
    return next(new AppError("Bunday token mavjud emas"));
  }

  next();
});

const forgotPassword = catchErrorAsync(async (req, res, next) => {
  if (!req.body.email) {
    return next(new AppError("email kiritilmagan", 401));
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("emailingiz notugri kiritilgan", 404));
  }

  const token = user.hashTokenMethod();
  await user.save({ validateBeforeSave: false });
  res.status(201).json({
    token,
    data: user,
  });
});

module.exports = { signup, login, protect, forgotPassword };
