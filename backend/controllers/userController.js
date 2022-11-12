const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

//@desc     Register a new user
//@route    /api/users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  //if all fields are complete, find if user already exists
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user (mapping the userModel fields with the req.body)
  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  //if user is created
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc     Login a user
//@route    /api/users
//@access   Public
const loginUser = asyncHandler(async (req, res) => {
  res.send("Login route");
});

module.exports = {
  registerUser,
  loginUser,
};
