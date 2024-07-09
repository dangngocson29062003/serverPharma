const Router = require("express");
const {
  createCategory,
  getCategories,
  addNewProduct,
  getProductsByCategoryId,
  getProducts,
  searchProducts,
  getProductsBySubCategory,
  getProductsBySubSubCategory,
  getBestSeller,
  getProductDiscount,
} = require("../controller/productController");
const productRouter = Router();
productRouter.post("/create-category", createCategory);
productRouter.get("/get-categories", getCategories);
productRouter.post("/add-new-product", addNewProduct);
productRouter.get("/get-products", getProducts);
productRouter.get("/search-products", searchProducts);
productRouter.get("/get-products-by-categoryid", getProductsByCategoryId);
productRouter.get("/get-products-by-subcategory", getProductsBySubCategory);
productRouter.get(
  "/get-products-by-sub-subcategory",
  getProductsBySubSubCategory
);
productRouter.get("/get-best-seller", getBestSeller);
productRouter.get("/get-products-discount", getProductDiscount);
module.exports = productRouter;
