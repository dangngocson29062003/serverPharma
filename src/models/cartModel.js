const { default: mongoose } = require("mongoose");
const ProductModel = require("./productModel");

const CartSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  email: {
    type: String,
    require: true,
  },
  products: {
    type: [
      {
        productId: { type: String },
        quantity: { type: Number },
      },
    ],
  },
  total: {
    type: Number,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});
const CartModel = mongoose.model("carts", CartSchema);
module.exports = CartModel;
