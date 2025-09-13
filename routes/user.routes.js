import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import { getAllUsers, getUserById } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter.get("/:id", authorize, getUserById);

userRouter.post("/", (req, res) => {
  // Handle creating a new user here
  res.send({ title: "CREATE New User" });
});

userRouter.put("/:id", (req, res) => {
  // Handle updating user details here
  res.send({ title: "UPDATE User by ID" });
});

userRouter.delete("/:id", (req, res) => {
  // Handle deleting user account here
  res.send({ title: "DELETE User by ID" });
});

export default userRouter;
