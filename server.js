const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");
const DB = process.env.DB.replace("<password>", process.env.PASSWORD);

mongoose.connect(
  DB,
  () => {
    console.log("node connected to DB");
  },
  () => {
    console.log("hatto URL, DB ishlagani yuq");
  }
);

app.listen(process.env.PORT || 8000, process.env.URL, () => {
  console.log("server works");
});
