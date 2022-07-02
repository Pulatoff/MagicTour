const catchErrorAsync = require("../helper/catchAsync");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const AppError = require("../helper/appError");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mail = require("../helper/mail");

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

  const resetLink = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${token}`;
  const subject = "Reset Password for MagicTour";
  const text = `<h2>Bu link 10 minut amal qiladi</h2>
  <a href=${resetLink}>${resetLink}</a>`;

  const oto = "noyozbepulatov0312@gmail.com";

  await mail({
    from: process.env.EMAIL_USER,
    to: oto,
    subject: subject,
    html: text,
  });
  res.status(201).json({
    token,
    data: user,
  });
});

const resetPassword = catchErrorAsync(async (req, res, next) => {
  const token = req.params.token;
  const hashToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    resetTokenHash: hashToken,
    resetTokenVaqti: { $gt: Date.now() },
  });
  console.log(user);
  if (!user) {
    user.resetTokenHash = undefined;
    user.resetTokenVaqti = undefined;
    return next(new AppError("Vaqti utib ketdi qayta urnib kurin", 404));
  }
  if (!req.body.password || !req.body.passwordConfirm) {
    return next(new AppError("Siz parolni kirishimiz shart"), 404);
  }
  if (!(req.body.password === req.body.passwordConfirm)) {
    return next(new AppError("Siz birhil parol kiritmazis"));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordChangeDate = Date.now();

  user.resetTokenHash = undefined;
  user.resetTokenVaqti = undefined;

  await user.save();

  const tokenJwt = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    tokenJwt,
    status: "success",
  });
});

module.exports = { signup, login, protect, forgotPassword, resetPassword };
