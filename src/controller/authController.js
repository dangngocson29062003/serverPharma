const UserModel = require("../models/userModel");
const asyncHandle = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
const getJsonWebToken = async (email, id) => {
  const payload = {
    email,
    id,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
};
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.USERNAME_EMAIL,
    pass: process.env.PASSWORD_EMAIL,
  },
});
const handleSendMail = async (val) => {
  try {
    await transporter.sendMail(val);

    return "OK";
  } catch (error) {
    return error;
  }
};

const verification = asyncHandle(async (req, res) => {
  const { email } = req.body;

  const verificationCode = Math.round(1000 + Math.random() * 9000);

  try {
    const data = {
      from: `"Support Pharmatown Appplication" <${process.env.USERNAME_EMAIL}>`,
      to: email,
      subject: "Verification email code",
      text: "Your code to verification email",
      html: `<h1>${verificationCode}</h1>`,
    };

    await handleSendMail(data);

    res.status(200).json({
      data: {
        code: verificationCode,
      },
    });
  } catch (error) {
    res.status(401);
    throw new Error("Can not send email");
  }
});
const forgotPassword = asyncHandle(async (req, res) => {
  const { email } = req.body;

  const randomPassword = Math.round(100000 + Math.random() * 99000);

  const data = {
    from: `"New Password" <${process.env.USERNAME_EMAIL}>`,
    to: email,
    subject: "Verification email code",
    text: "Your code to verification email",
    html: `<h1>${randomPassword}</h1>`,
  };

  const user = await UserModel.findOne({ email });
  if (user) {
    const salt = await bcryp.genSalt(10);
    const hashedPassword = await bcryp.hash(`${randomPassword}`, salt);

    await UserModel.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    })
      .then(() => {
        console.log("Done");
      })
      .catch((error) => console.log(error));

    await handleSendMail(data)
      .then(() => {
        res.status(200).json({
          message: "Send email new password successfully!!!",
          data: [],
        });
      })
      .catch((error) => {
        res.status(401);
        throw new Error("Can not send email");
      });
  } else {
    res.status(401);
    throw new Error("User not found!!!");
  }
});

const register = asyncHandle(async (req, res) => {
  const { email, password, fullname } = req.body;
  console.log(email);
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    res.status(401);
    throw new Error(`User has already exits!!!`);
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new UserModel({
    email,
    fullname: fullname ?? "",
    password: hashedPassword,
  });
  await newUser.save();
  res.status(200).json({
    id: newUser.id,
    name: newUser.fullname,
    email: newUser.email,
    password: newUser.password,
    accesstoken: await getJsonWebToken(email, newUser.id),
  });
  console.log(hashedPassword);
});
const login = asyncHandle(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const existingUser = await UserModel.findOne({ email });
  if (!existingUser) {
    res.status(403).json({
      message: "User not found!!!",
    });
    throw new Error(`User has already exits!!!`);
  }
  const isMatchPassword = await bcrypt.compare(password, existingUser.password);
  if (!isMatchPassword) {
    res.status(401);
    throw new Error("Email or Password is not correct");
  }
  res.status(200).json({
    id: existingUser.id,
    name: existingUser.fullname,
    email: existingUser.email,
    password: existingUser.password,
    gender: existingUser.gender,
    birthDay: existingUser.birthDay,
    phone: existingUser.address,
    city: existingUser.city,
    district: existingUser.district,
    ward: existingUser.ward,
    address: existingUser.address,
    accesstoken: await getJsonWebToken(email, existingUser.id),
  });
});
const updateUser = asyncHandle(async (req, res) => {
  const { userId } = req.query;
  const {
    fullname,
    email,
    password,
    gender,
    birthDay,
    city,
    ward,
    district,
    address,
    phone,
  } = req.body;

  // Find the existing user
  const existingUser = await UserModel.findById(userId);

  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  // Update the user's information
  existingUser.fullname = fullname || existingUser.fullname;
  existingUser.email = email || existingUser.email;
  existingUser.gender = gender || existingUser.gender;
  existingUser.birthDay = birthDay || existingUser.birthDay;
  existingUser.address = address || existingUser.address;
  existingUser.phone = phone || existingUser.phone;
  existingUser.city = city || existingUser.city;
  existingUser.district = district || existingUser.district;
  existingUser.ward = ward || existingUser.ward;
  existingUser.address = address || existingUser.address;
  // Hash the new password
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    existingUser.password = hashedPassword;
  }

  // Save the updated user
  await existingUser.save();

  // Generate a new access token
  const accessToken = await getJsonWebToken(email, existingUser.id);

  res.status(200).json({
    id: existingUser.id,
    name: existingUser.fullname,
    email: existingUser.email,
    gender: existingUser.gender,
    birthDay: existingUser.birthDay,
    phone: existingUser.phone,
    city: existingUser.city,
    district: existingUser.district,
    ward: existingUser.ward,
    address: existingUser.address,
    accessToken,
  });
});
module.exports = {
  register,
  login,
  verification,
  updateUser,
};
