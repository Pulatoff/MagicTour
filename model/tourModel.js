const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [8, "Suz sakkiztadan kam bulmasligi kerak"],
      maxlength: [40, "Suz 40 tadan kup bulmasligi kerak"],
    },
    duration: {
      type: Number,
      required: true,
      min: [1, "Durationga past qiyamat kiritinggiz"],
      max: [100, "Durtionga baland raqam kiritiz"],
    },
    maxGroupSize: {
      type: Number,
      required: true,
      validate: {
        validator: function (val) {
          if (Number.isInteger(val) || val > 0) {
            return true;
          }
          return false;
        },
        message: "Hato odamlar sonini kiritiz",
      },
    },
    difficulty: {
      type: String,
      required: true,
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "siz hato difficulty kiritiz",
      },
    },
    ratingsAverage: {
      type: Number,
      required: true,
    },
    ratingsQuantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageCover: {
      type: String,
      required: true,
    },
    images: [String],
    secretnInfo: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual("HaftaDavomEtish").get(function () {
  return this.duration / 7;
});

// DOCUMENT MiddleWare
tourSchema.pre("save", function (next) {
  this.name = this.name + 1;
  this.startTime = Date.now();
  next();
});

tourSchema.post("save", function (doc, next) {
  console.log(doc.startTime - Date.now());
  next();
});

// Query MiddleWare

tourSchema.pre("find", function (next) {
  this.find({ secretInfo: { $ne: true } });
  next();
});

module.exports = mongoose.model("tours", tourSchema);
