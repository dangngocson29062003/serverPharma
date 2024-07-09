const { default: mongoose } = require("mongoose");

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
  },
  subCategories: {
    type: [
      {
        title: { type: String },
        url: { type: String },
        children: [
          {
            title: { type: String },
            url: { type: String },
          },
        ],
      },
    ],
  },
  url: {
    type: String,
  },
  key: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const CategoryModel = mongoose.model("categories", CategorySchema);
module.exports = CategoryModel;
