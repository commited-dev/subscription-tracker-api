import { ADMIN_ROLE } from "../config/env.js";
import User from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password"); // Exclude password field;

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // User can update self, admin can update anyone
    if (req.user._id.toString() !== id && req.user.role !== ADMIN_ROLE) {
      return res
        .status(403)
        .json({ message: "Forbidden: cannot update this user" });
    }

    // Prevent role escalation unless admin
    if (req.body.role && req.user.role !== ADMIN_ROLE) {
      return res.status(403).json({ message: "Forbidden: cannot change role" });
    }

    // Update user safely (never allow password update here)
    const allowedFields = ["name", "email", "role"]; // add more fields if needed
    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field]) updates[field] = req.body[field];
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
      select: "-password", // exclude password from response
    });

    if (!updatedUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Prevent admins from deleting themselves (optional safeguard)
    if (req.user._id.toString() === id) {
      return res
        .status(400)
        .json({ message: "Admins cannot delete themselves" });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
    next(error);
  }
};
