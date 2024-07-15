const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    require: true,
  },
  birthDay: {
    type: Date,
    default: Date.now(),
  },
  gender: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  district: {
    type: String,
    default: "",
  },
  ward: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});
const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
