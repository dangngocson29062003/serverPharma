const CartModel = require("../models/cartModel");

const addNewCart = asyncHandle(async (req, res) => {
  const body = req.body;
  if (body) {
    const newCart = new CartModel(body);
    await newCart.save();

    res.status(200).json({
      message: "Add new product to cart successfully!!!",
      data: newEvent,
    });
  } else {
    res.status(401);
    throw new Error("Product data not found!!!");
  }
});
module.exports = {
  addNewCart,
};
