//TEMP
const bcrypt = require("bcryptjs");
//TEMP

//const { promisify } = require("util");
//const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const signToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body; //destructuring!
  let passHash = await bcrypt.hash(password, 12);
  console.log("PASSHASH:", passHash);

  try {
    if (email === "temp") {
      return res.status(200).json({
        status: "success",
        message: passHash,
      });
    }

    //1) Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Please provide email and password",
      });
    }
    //2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "error",
        message: "Incorrect email or password supplied",
      });
    }
    //3) If all okay, send token to client
    createSendToken(user, 200, res);
    // return res.status(200).json({
    //   status: "success",
    //   message:
    //     "So far, the process works! This now needs to be implemented with a JWT token, then hash that password!",
    // });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
