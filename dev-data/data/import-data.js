const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const Tour = require("../../model/tourModel");

console.log(process.env.DB);

const DB = process.env.DB.replace("<password>", process.env.PASSWORD);
const data = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
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
    const dataBit = await Tour.create(data);
    console.log("data writed to DB");
  } catch (e) {
    console.log("data don't writed to DB" + e);
  }
}

async function removeModel() {
  try {
    const deleteD = await Tour.deleteMany();
    console.log("data removed to DB");
  } catch (e) {
    console.log("data don't removed to DB");
  }
}

if (process.argv[2] === "--add") {
  addModel();
} else if (process[2] === "--remove") {
  removeModel();
}

console.log(process.argv);
