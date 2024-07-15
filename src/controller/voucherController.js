const VoucherModel = require("../models/voucherModel");

const GetVoucher = async (req, res) => {
  try {
    // Lấy danh sách các voucher từ cơ sở dữ liệu
    const vouchers = await VoucherModel.find({});

    // Trả về danh sách các voucher dưới dạng JSON
    res.json(vouchers);
  } catch (err) {
    // Xử lý lỗi nếu có
    console.error(err);
    res.status(500).json({ message: "Lỗi khi lấy danh sách voucher" });
  }
};
const AddVoucher = async (req, res) => {
  try {
    const {
      name,
      code,
      discountPercentage,
      discountAmount,
      startDate,
      endDate,
      minOrderAmount,
      maxUsage,
    } = req.body;

    // Kiểm tra xem mã voucher đã tồn tại không
    const existingVoucher = await VoucherModel.findOne({ code });
    if (existingVoucher) {
      return res.status(400).json({ message: "Mã voucher đã tồn tại" });
    }

    // Tạo voucher mới
    const voucher = new VoucherModel({
      name,
      code,
      discountPercentage,
      discountAmount,
      startDate,
      endDate,
      minOrderAmount,
      maxUsage,
    });

    await voucher.save();

    return res.status(201).json(voucher);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi khi tạo voucher" });
  }
};
module.exports = {
  AddVoucher,
  GetVoucher,
};
