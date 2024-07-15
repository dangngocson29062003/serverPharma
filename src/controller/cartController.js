const CartModel = require("../models/cartModel");
const asyncHandle = require("express-async-handler");
const ProductModel = require("../models/productModel");
const VoucherModel = require("../models/voucherModel");

const GetCartByID = asyncHandle(async (req, res) => {
  const { id } = req.query;
  console.log(id);
  const cart = await CartModel.findOne({ idUser: { $all: id } });

  res.status(200).json({
    idUser: cart.idUser,
    products: cart.products,
    total: cart.total,
    voucher: cart.voucher,
    discountAmount: cart.discountAmount,
  });
});
const PutItemToCart = asyncHandle(async (req, res) => {
  const { idUser, products } = req.body;
  const cart = await CartModel.findOne({ idUser: idUser });
  const product = await ProductModel.findById(products.productId.toString());
  let total;
  if (product.discount > 0) {
    total =
      products.quantity *
      (product.price - (product.price * product.discount) / 100);
  } else {
    total = products.quantity * product.price;
  }
  if (!cart) {
    const newCart = new CartModel({
      idUser: idUser,
      products: [products],
      total: total,
    });
    await newCart.save();
    return res.status(200).json({ data: newCart });
  }

  const existingProduct = cart.products.filter((item) => {
    return item.productId.toString() === products.productId.toString();
  });
  if (existingProduct.length > 0) {
    const oldQuantity = existingProduct[0].quantity;
    const newQuantity = products.quantity;
    let oldTotal;
    if (product.discount > 0) {
      oldTotal =
        oldQuantity *
        (product.price - (product.price * product.discount) / 100);
    } else {
      oldTotal = oldQuantity * product.price;
    }
    let newTotal;
    if (product.discount > 0) {
      newTotal =
        newQuantity *
        (product.price - (product.price * product.discount) / 100);
    } else {
      newTotal = newQuantity * product.price;
    }
    if (newQuantity > oldQuantity) {
      cart.total = cart.total + (newTotal - oldTotal);
    } else if (newQuantity === 0) {
      // Xóa sản phẩm khỏi giỏ hàng nếu số lượng bằng 0
      cart.products = cart.products.filter((item) => {
        return item.productId.toString() !== products.productId.toString();
      });
      cart.total = cart.total - oldTotal;
    } else {
      cart.total = cart.total - (oldTotal - newTotal);
    }
    cart.products = cart.products.map((item) => {
      if (item.productId.toString() === products.productId.toString()) {
        return {
          ...item,
          quantity: products.quantity,
        };
      }
      return item;
    });
  } else {
    cart.products.push(products);
    cart.total += total;
  }
  await cart.save();

  res.status(200).json({
    idUser: cart.idUser,
    products: cart.products,
    total: cart.total,
  });
});
const ApplyVoucher = async (req, res) => {
  try {
    const { idUser } = req.query;
    const { voucherCode } = req.body;
    console.log(voucherCode);
    // Lấy thông tin của voucher
    const voucher = await VoucherModel.findOne({
      code: voucherCode,
    });
    if (!voucher) {
      return res.status(404).json({ message: "Voucher không tồn tại" });
    }
    // Lấy thông tin của giỏ hàng
    const cart = await CartModel.findOne({ idUser: idUser });
    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại" });
    }

    // Kiểm tra điều kiện áp dụng voucher
    const { total } = cart;
    if (total < voucher.minOrderAmount) {
      return res
        .status(400)
        .json({ message: "Giá trị đơn hàng không đủ để áp dụng voucher" });
    }

    // Áp dụng voucher vào giỏ hàng
    let discountAmount;
    if (voucher.discountPercentage > 0) {
      discountAmount = total * (voucher.discountPercentage / 100);
    } else {
      discountAmount = voucher.discountAmount;
    }
    cart.discountAmount = total - discountAmount;
    cart.voucher = voucher._id;

    await cart.save();

    return res.json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi khi áp dụng voucher" });
  }
};
const RemoveVoucher = async (req, res) => {
  try {
    const { idUser } = req.query;

    // Lấy thông tin của voucher

    // Lấy thông tin của giỏ hàng
    const cart = await CartModel.findOneAndUpdate({ idUser: idUser });
    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại" });
    }

    const voucher = await VoucherModel.findById(cart.voucher);
    if (!voucher) {
      return res.status(404).json({ message: "Voucher không tồn tại" });
    }

    cart.discountAmount = 0;
    cart.voucher = "";

    await cart.save();

    return res.json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi khi áp dụng voucher" });
  }
};
module.exports = {
  GetCartByID,
  PutItemToCart,
  ApplyVoucher,
  RemoveVoucher,
};
