const Router = require("express");
const { addNewCart, getCartByID } = require("../controller/cartController");
const cartRouter = Router();
cartRouter.post("/", addNewCart);
cartRouter.get("/GetCartById", getCartByID);
module.exports = cartRouter;
