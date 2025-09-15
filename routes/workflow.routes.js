import express, { Router } from "express";
import { sendReminders } from "../controllers/workflow.controller.js";

const workflowRouter = Router();

workflowRouter.post(
  "/subscription/reminder",
  express.raw({ type: "*/*" }), // Required for Upstash Workflows
  sendReminders
);

export default workflowRouter;
