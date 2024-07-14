const Router = require("express");
const {
  AddNewCart,
  GetCartByID,
  PutItemToCart,
} = require("../controller/cartController");
const cartRouter = Router();
cartRouter.get("/GetCartById", GetCartByID);
cartRouter.put("/PutItemToCart", PutItemToCart);
module.exports = cartRouter;
