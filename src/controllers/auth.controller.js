//  Require dependencies
const  User  = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

const {
  validateRegister,
  validateLogin,
} = require("../middleware/validiate.middleware");

const createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, userName, email, password } = req.body;
    await validateRegister.validateAsync(req.body);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "email exists, please login",
      });
    }
    // hashing password
    const hashPassword = await bcrypt.hash(password, 10);

    // create  a new Admin
    const newUser = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashPassword,
    });
    newUser.set("password", undefined);
    return res.status(201).json({
      message: "User created sucessfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

// logging in a user
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await validateLogin.validateAsync(req.body);

    const emailExist = await User.findOne({ email });
    if (!emailExist) {
      return res.status(400).json({
        message: "Email does not exist please sign-up",
      });
    }
    const validPassword = await bcrypt.compare(password, emailExist.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid credientials",
      });
    }
    const data = {
      _id: emailExist._id,
    };

    const token = await jwt.sign(data, process.env.SECRET_TOKEN, {
      expiresIn: "24h",
    });
console.log(212, req.user);
    emailExist.isLoggedIn = true;
    await emailExist.save();
    return res.status(200).json({
      message: "User logged in sucessfully",
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  req.user = null;

  res.status(200).json({
    status: true,
    message: "Logged out sucessfully",
  });
  return;
};
module.exports = { createUser, login, logout };
