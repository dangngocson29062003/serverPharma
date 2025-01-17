const { default: mongoose } = require("mongoose");
const ProductModel = require("./productModel");

const CartSchema = new mongoose.Schema({
  idUser: {
    type: String,
    require: true,
  },
  products: {
    type: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId },
        quantity: { type: Number },
      },
    ],
  },
  total: {
    type: Number,
  },
  discountAmount: {
    type: Number,
    default: 0,
  },
  voucher: {
    type: String,
    default: "",
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});
const CartModel = mongoose.model("carts", CartSchema);
module.exports = CartModel;
