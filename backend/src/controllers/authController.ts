//TEMP
import bcrypt from "bcryptjs";
//TEMP
import jwt from "jsonwebtoken";
//import type { SignOptions } from "jsonwebtoken";
import User from "../models/userModel.js";
import Staff from "../models/staffModel.js";
import type { Request, Response, NextFunction } from "express";

import type { CookieOptions } from "express";

interface IdParams {
  id: string;
}

//const { promisify } = require("util");
//const crypto = require("crypto");
const expires = process.env.JWT_EXPIRES_IN!;
const signToken = function (
  userId: string,
  merchantId?: string,
  role?: string,
) {
  return jwt.sign({ id: userId, merchantId, role }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN! as never,
  });
};

const createSendToken = (user: any, statusCode: number, res: Response) => {
  const expiresInDays = Number(process.env.JWT_COOKIE_EXPIRES_IN!);
  const token = signToken(user._id, user.merchant, user.role);

  const cookieOptions: CookieOptions = {
    expires: new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000),
    httpOnly: false,
  };
  if (process.env.NODE_ENV! === "production") cookieOptions.secure = true;

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

const login = async (req: Request, res: Response, next: NextFunction) => {
  let { email, password } = req.body; //destructuring!
  //I'm not sure if case sensitivity is a thing? It's mongo so probably?
  email = email.toLowerCase();

  try {
    //1) Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Please provide email address and password",
      });
    }
    //2) Check if user exists && password is correct
    const user = (await User.findOne({ email }).select("+password")) as any;

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "error",
        message: "Incorrect email address or password supplied",
      });
    }

    // 3) if role starts with merchant, it's staff, query merchantId
    if (user.role.slice(0, 8) === "merchant") {
      const staff = await Staff.findOne({ user: user._id }, "+merchant._id");

      user.merchant = staff?.merchant?._id;
    } //'merchant_staff'

    //4) If all okay, send token to client
    createSendToken(user, 200, res);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
};
//TODO
const logout = (req: Request<IdParams>, res: Response) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10000),
    httpOnly: true,
  });
  res
    .status(200)
    .json({ status: "success", message: "You are now logged out!" });
};

// TODO
const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }

    next();
  }
};

export default { signToken, createSendToken, login, logout, isLoggedIn };
