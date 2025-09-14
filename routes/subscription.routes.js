import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import {
  getUserSubscriptions,
  createSubscription,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  // Handle fetching subscriptions here
  res.send({ title: "GET all subscriptions" });
});

subscriptionRouter.get("/:id", (req, res) => {
  // Handle fetching a specific subscription by ID here
  res.send({ title: "GET Subscription by ID" });
});

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id", (req, res) => {
  // Handle updating subscription details here
  res.send({ title: "UPDATE Subscription by ID" });
});

subscriptionRouter.delete("/:id", (req, res) => {
  // Handle deleting a subscription here
  res.send({ title: "DELETE Subscription by ID" });
});

subscriptionRouter.put("/:id/cancel", (req, res) => {
  // Handle cancel subscription here
  res.send({ title: "CANCEL Subscription" });
});

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  // Handle fetching renewals subscription here
  res.send({ title: "GET upcoming renewals" });
});

export default subscriptionRouter;
