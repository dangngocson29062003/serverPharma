const CategoryModel = require("../models/categoryModel");
const asyncHandle = require("express-async-handler");
const ProductModel = require("../models/productModel");
const addNewProduct = asyncHandle(async (req, res) => {
  const body = req.body;
  if (body) {
    const newEvent = new ProductModel(body);
    await newEvent.save();

    res.status(200).json({
      message: "Add new product successfully!!!",
      data: newEvent,
    });
  } else {
    res.status(401);
    throw new Error("Product data not found!!!");
  }
});
const getProducts = asyncHandle(async (req, res) => {
  const products = await ProductModel.find({});

  res.status(200).json({
    message: "get products ok",
    data: products,
  });
});
const getProductById = asyncHandle(async (req, res) => {
  const { id } = req.query;
  const products = await ProductModel.findById({ _id: id });

  res.status(200).json({
    data: products,
  });
});
const getBestSeller = asyncHandle(async (req, res) => {
  const products = await ProductModel.find({});
  const sortedProducts = products.sort((a, b) => b.sold - a.sold);

  const bestSellers = sortedProducts.slice(0, 1);

  res.status(200).json({
    message: "get best seller ok",
    data: bestSellers,
  });
});
const getProductDiscount = asyncHandle(async (req, res) => {
  const products = await ProductModel.find({});
  const items = products.filter((element) => element.discount > 0);

  res.status(200).json({
    message: "get product discount ok",
    data: items,
  });
});
const searchProducts = asyncHandle(async (req, res) => {
  const { title } = req.query;

  const products = await ProductModel.find({});

  const items = products.filter((element) =>
    element.title.toLowerCase().includes(title.toLocaleLowerCase())
  );

  res.status(200).json({
    message: "get products ok",
    data: items,
  });
});
const getProductsByCategoryId = asyncHandle(async (req, res) => {
  const { id } = req.query;

  const items = await ProductModel.find({ categories: { $all: id } });

  res.status(200).json({
    message: "get Product by categories successfully!!!",
    data: items,
  });
});
const getProductsBySubCategory = asyncHandle(async (req, res) => {
  const { id } = req.query;

  const items = await ProductModel.find({ subCategories: { $all: id } });

  res.status(200).json({
    message: "get Product by sub categories successfully!!!",
    data: items,
  });
});
const getProductsBySubSubCategory = asyncHandle(async (req, res) => {
  const { id } = req.query;

  const items = await ProductModel.find({ subSubCategories: { $all: id } });

  res.status(200).json({
    message: "get Product by sub sub categories successfully!!!",
    data: items,
  });
});
const createCategory = asyncHandle(async (req, res) => {
  const data = req.body;

  const newCategory = new CategoryModel(data);

  newCategory.save();
  res.status(200).json({
    message: "Add new category successfully!!!",
    data: newCategory,
  });
});
const getCategories = asyncHandle(async (req, res) => {
  const items = await CategoryModel.find({});

  res.status(200).json({
    message: "get successfully!!!",
    data: items,
  });
});
module.exports = {
  createCategory,
  getCategories,
  addNewProduct,
  getProducts,
  getProductById,
  searchProducts,
  getProductsByCategoryId,
  getProductsBySubCategory,
  getProductsBySubSubCategory,
  getBestSeller,
  getProductDiscount,
};
