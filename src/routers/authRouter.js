const Router = require("express");
const {
  register,
  login,
  verification,
  updateUser,
} = require("../controller/authController");
const authRouter = Router();
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/verification", verification);
authRouter.put("/updateUser", updateUser);
module.exports = authRouter;
