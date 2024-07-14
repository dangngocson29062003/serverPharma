const CartModel = require("../models/cartModel");
const asyncHandle = require("express-async-handler");
const ProductModel = require("../models/productModel");

const GetCartByID = asyncHandle(async (req, res) => {
  const { id } = req.query;
  console.log(id);
  const cart = await CartModel.find({ idUser: { $all: id } });

  res.status(200).json({
    data: cart,
  });
});
const PutItemToCart = asyncHandle(async (req, res) => {
  const { idUser, products } = req.body;
  const cart = await CartModel.findOne({ idUser: idUser });
  const product = await ProductModel.findById(products.productId.toString());
  let total;
  if (product.discount > 0) {
    total =
      products.quantity *
      (product.price - (product.price * product.discount) / 100);
  } else {
    total = products.quantity * product.price;
  }
  console.log(total);
  if (!cart) {
    const newCart = new CartModel({
      idUser: idUser,
      products: [products],
      total: total,
    });
    await newCart.save();
    return res.status(200).json({ data: newCart });
  }

  const existingProduct = cart.products.filter((item) => {
    return item.productId.toString() === products.productId.toString();
  });
  console.log(products.quantity);
  if (existingProduct.length > 0) {
    const oldQuantity = existingProduct[0].quantity;
    const newQuantity = products.quantity;
    let oldTotal;
    if (product.discount > 0) {
      oldTotal =
        oldQuantity *
        (product.price - (product.price * product.discount) / 100);
    } else {
      oldTotal = oldQuantity * product.price;
    }
    let newTotal;
    if (product.discount > 0) {
      newTotal =
        newQuantity *
        (product.price - (product.price * product.discount) / 100);
    } else {
      newTotal = newQuantity * product.price;
    }
    if (newQuantity > oldQuantity) {
      cart.total = cart.total + (newTotal - oldTotal);
    } else if (newQuantity === 0) {
      // Xóa sản phẩm khỏi giỏ hàng nếu số lượng bằng 0
      cart.products = cart.products.filter((item) => {
        return item.productId.toString() !== products.productId.toString();
      });
      cart.total = cart.total - oldTotal;
    } else {
      cart.total = cart.total - (oldTotal - newTotal);
    }
    cart.products = cart.products.map((item) => {
      if (item.productId.toString() === products.productId.toString()) {
        return {
          ...item,
          quantity: products.quantity,
        };
      }
      return item;
    });
  } else {
    cart.products.push(products);
    cart.total += total;
  }
  await cart.save();

  res.status(200).json({
    data: cart,
  });
});
module.exports = {
  GetCartByID,
  PutItemToCart,
};
