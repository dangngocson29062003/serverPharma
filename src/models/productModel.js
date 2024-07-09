/** @format */

const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  photoUrl: {
    type: [String],
  },
  sold: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  price: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  subCategories: {
    type: [String],
    required: true,
  },
  subSubCategories: {
    type: [String],
    require: true,
  },
  //chỉ định
  indication: {
    type: [String],
  },
  //chống chỉ định
  contraindication: {
    type: [String],
  },
  //liều lượng
  dosage: {
    type: [String],
  },
  //công dụng
  uses: {
    type: [String],
  },
  //hoạt chất
  activeElement: {
    type: [{ title: { type: String }, desc: { type: [String] } }],
  },
  //nhà sản xuất
  producer: {
    type: String,
  },
  //đóng gói
  packing: {
    type: String,
  },
  //tác dụng phụ
  sideEffect: {
    type: [String],
  },
  //thận trọng
  careFul: {
    type: [String],
  },
  //tương tác thuốc khi sử dụng gây nguy hiểm
  drugInteractions: {
    type: [String],
  },
  //độ tuổi sử dụng
  ageOfUse: {
    type: [String],
  },
  //giới tính sử dụng
  genderOfUse: {
    type: [String],
  },
  //hướng dẫn sử dụng
  using: {
    type: [String],
  },
  //khuyến cáo
  recommendation: {
    type: [String],
  },
  preserve: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;
