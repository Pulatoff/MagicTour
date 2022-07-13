const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const Tour = require("../../model/tourModel");
const User = require("../../model/userModel");
const Review = require("../../model/reviewModel");
console.log(process.env.DB);

const DB = process.env.DB.replace("<password>", process.env.PASSWORD);
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, "utf-8"));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, "utf-8")
);

mongoose.connect(
  DB,
  () => {
    console.log("conected to database");
  },
  (e) => {
    console.log("hatto DBda");
  }
);

async function addModel() {
  try {
    await Tour.create(tours);
    await User.create(users);
    await Review.create(reviews);
    console.log("data writed to DB");
  } catch (e) {
    console.log("data don't writed to DB" + e);
  }
}

async function removeModel() {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log("data removed to DB");
  } catch (e) {
    console.log("data don't removed to DB");
  }
}

addModel();

//removeModel();

console.log(process.argv);
