const mongoose = require("mongoose");
const validator = require("validator");
const bycrpt = require("bcryptjs");
const crypto = require("crypto");
// name, email, photo, password, confirmPassword

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "You must enter your name!"],
  },
  email: {
    type: String,
    required: [true, "You must enter tour email!"],
    unique: [true, "Your email have already used!"],
    lowercase: true,
    validate: [validator.isEmail, "Please validate correct email"],
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "guide", "moderator", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "You must enter password!"],
    minlength: [8, "You must enter at least 8 character!"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "You must enter confirm password!"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords is not the same",
    },
  },
  passwordChangeDate: {
    type: Date,
    default: null,
  },
  resetTokenHash: String,
  resetTokenVaqti: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  this.password = await bycrpt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.hashTokenMethod = function () {
  const token = crypto.randomBytes(32).toString("hex");
  const hashtoken = crypto.createHash("sha256").update(token).digest("hex");

  this.resetTokenHash = hashtoken;
  this.resetTokenVaqti = Date.now() + 10 * 60 * 1000;

  return token;
};

const User = mongoose.model("users", userSchema);

module.exports = User;
