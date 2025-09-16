import { Router } from "express";
import {
  authenticateUser,
  authorizeUser,
} from "../middlewares/auth.middleware.js";
import {
  getAllSubscriptions,
  getSubscriptionById,
  getUserSubscriptions,
  createSubscription,
  updateSubscriptionById,
  deleteSubscriptionById,
  cancelSubscriptionById,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get(
  "/",
  authenticateUser,
  authorizeUser("admin"),
  getAllSubscriptions
);

subscriptionRouter.get(
  "/:id",
  authenticateUser,
  authorizeUser("admin"),
  getSubscriptionById
);

subscriptionRouter.post("/", authenticateUser, createSubscription);

subscriptionRouter.get("/user/:id", authenticateUser, getUserSubscriptions);

subscriptionRouter.put("/:id", authenticateUser, updateSubscriptionById);

subscriptionRouter.delete("/:id", authenticateUser, deleteSubscriptionById);

subscriptionRouter.put("/:id/cancel", authenticateUser, cancelSubscriptionById);

export default subscriptionRouter;
