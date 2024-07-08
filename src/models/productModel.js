/** @format */

const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  photoUrl: {
    type: String,
  },
  like: {
    type: Number,
  },
  sold: {
    type: Number,
  },
  price: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;
