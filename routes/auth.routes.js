import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", (req, res) => {
  // Handle login logic here
  res.send({ title: "Login" });
});

authRouter.post("/register", (req, res) => {
  // Handle registration logic here
  res.send({ title: "Register" });
});

authRouter.post("/logout", (req, res) => {
  // Handle logout logic here
  res.send({ title: "Logout" });
});

export default authRouter;
