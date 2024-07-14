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

  if (!cart) {
    const newCart = new CartModel({
      idUser: idUser,
      products: [products],
      total: total,
    });
    await newCart.save();
    return res.status(200).json({ data: newCart });
  }

  const existingProduct = cart.products.find(
    (item) => item.productId === products.productId
  );
  console.log(existingProduct);
  if (existingProduct) {
    existingProduct.quantity = product.quantity;
    cart.total = cart.total - existingProduct.quantity * product.price + total;
  } else {
    cart.products.push(products);
    cart.total += total;
  }
  console.log(cart);
  await cart.save();

  res.status(200).json({
    data: cart,
  });
});
module.exports = {
  GetCartByID,
  PutItemToCart,
};
