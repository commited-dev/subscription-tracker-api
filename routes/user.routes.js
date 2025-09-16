import { Router } from "express";
import {
  authenticateUser,
  authorizeUser,
} from "../middlewares/auth.middleware.js";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";
import { ADMIN_ROLE } from "../config/env.js";

const userRouter = Router();

userRouter.get("/", authenticateUser, authorizeUser(ADMIN_ROLE), getAllUsers);

userRouter.get("/:id", authenticateUser, getUserById);

userRouter.put("/:id", authenticateUser, updateUser);

userRouter.delete(
  "/:id",
  authenticateUser,
  authorizeUser(ADMIN_ROLE),
  deleteUser
);

export default userRouter;
