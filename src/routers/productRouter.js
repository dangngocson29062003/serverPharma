const Router = require("express");
const {
  createCategory,
  getCategories,
  addNewProduct,
  getProductsByCategoyId,
  getProducts,
  searchProducts,
} = require("../controller/productController");
const productRouter = Router();
productRouter.post("/create-category", createCategory);
productRouter.get("/get-categories", getCategories);
productRouter.post("/add-new-product", addNewProduct);
productRouter.get("/get-products", getProducts);
productRouter.get("/search-products", searchProducts);
productRouter.get("/get-products-by-categoryid", getProductsByCategoyId);
module.exports = productRouter;
