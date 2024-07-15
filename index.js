const express = require("express");
const cors = require("cors");
const authRouter = require("./src/routers/authRouter");
const connectDB = require("./src/configs/connectDb");
const errorMiddleware = require("./src/middlewares/errorMiddleware");
const productRouter = require("./src/routers/productRouter");
const cartRouter = require("./src/routers/cartRouter");
const voucherRouter = require("./src/routers/voucherRouter");
const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/voucher", voucherRouter);
app.use(errorMiddleware);
connectDB();
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Server starting at http://localhost:${PORT}`);
});
