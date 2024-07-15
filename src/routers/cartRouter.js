const Router = require("express");
const {
  AddNewCart,
  GetCartByID,
  PutItemToCart,
  ApplyVoucher,
  RemoveVoucher,
} = require("../controller/cartController");
const cartRouter = Router();
cartRouter.get("/GetCartById", GetCartByID);
cartRouter.put("/PutItemToCart", PutItemToCart);
cartRouter.put("/apply-voucher", ApplyVoucher);
cartRouter.put("/remove-voucher", RemoveVoucher);
module.exports = cartRouter;
