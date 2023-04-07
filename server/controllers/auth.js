import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const signup = async (req, res, next) => {
  try {
    // Validate input
    const { username, email, password } = req.body;
    if (!username || !password) {
      return next(createError(400, "Username and password are required!"));
    }

    // Hash password and create new user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({
      username,
      email,
      password: hash,
    });

    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    // Handle expected errors
    if (error.code === 11000) {
      return next(createError(400, "Username already taken!"));
    }
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    // Validate input
    const { username, password } = req.body;
    if (!username || !password) {
      return next(createError(400, "Username and password are required!"));
    }

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return next(createError(404, "User not found!"));
    }

    // Compare password with hash
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      return next(createError(400, "Wrong password!"));
    }

    // Sign and return JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password: _, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (error) {
    next(error);
  }
};
