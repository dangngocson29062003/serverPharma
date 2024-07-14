const CartModel = require("../models/cartModel");
const asyncHandle = require("express-async-handler");
const addNewCart = asyncHandle(async (req, res) => {
  const body = req.body;
  console.log(body);
  if (body) {
    const newCart = new CartModel(body);
    await newCart.save();

    res.status(200).json({
      message: "Add new product to cart successfully!!!",
      data: newCart,
    });
  } else {
    res.status(401);
    throw new Error("Product data not found!!!");
  }
});
const getCartByID = asyncHandle(async (req, res) => {
  const { id } = req.query;
  console.log(id);
  const cart = await CartModel.find({ idUser: { $all: id } });

  res.status(200).json({
    data: cart,
  });
});
module.exports = {
  addNewCart,
  getCartByID,
};
