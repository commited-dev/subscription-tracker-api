import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
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

subscriptionRouter.get("/", getAllSubscriptions);

subscriptionRouter.get("/:id", getSubscriptionById);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id", authorize, updateSubscriptionById);

subscriptionRouter.delete("/:id", authorize, deleteSubscriptionById);

subscriptionRouter.put("/:id/cancel", authorize, cancelSubscriptionById);

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  // Handle fetching renewals subscription here
  res.send({ title: "GET upcoming renewals" });
});

export default subscriptionRouter;
