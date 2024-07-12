const Router = require("express");
const cartRouter = Router();
cartRouter.post("/", addNewCart);
module.export = cartRouter;
