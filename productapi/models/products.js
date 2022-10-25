const mongoose = require("mongoose");

const images = new mongoose.Schema({
  _id: false,
  alt: { type: String },
  url: { type: String },
});

const products = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [images],
    isConfirmed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", products);
