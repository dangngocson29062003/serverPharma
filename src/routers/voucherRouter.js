const express = require("express");
const { AddVoucher, GetVoucher } = require("../controller/voucherController");

const voucherRouter = express.Router();

// API tạo voucher mới
voucherRouter.get("/", GetVoucher);
voucherRouter.post("/create-voucher", AddVoucher);
module.exports = voucherRouter;
