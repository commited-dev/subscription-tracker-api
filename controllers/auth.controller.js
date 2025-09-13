import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

import User from "../models/user.model.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("Invalid email address or password");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid email address or password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  const sesssion = await mongoose.startSession();
  sesssion.startTransaction();
  try {
    const { name, email, password } = req.body;

    const exsitingUser = await User.findOne({ email });

    if (exsitingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    // Hash the password before saving the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [{ name, email, password: hashedPassword }],
      { session: sesssion }
    );

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await sesssion.commitTransaction();
    sesssion.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { user: newUsers[0], token },
    });
  } catch (error) {
    await sesssion.abortTransaction();
    sesssion.endSession();
    next(error);
  }
};

export const logout = (req, res) => {
  res.send("Logout route");
};
