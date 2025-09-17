import express from "express";
import {
  getAllSubscriptions,
  getSubscriptionById,
  createSubscription,
  getUserSubscriptions,
  updateSubscriptionById,
  deleteSubscriptionById,
  cancelSubscriptionById,
} from "../../controllers/subscriptionController.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @openapi
 * /api/v1/subscriptions:
 *   get:
 *     tags: [Subscriptions]
 *     summary: Get all subscriptions (admin or general list)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of subscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Subscription"
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, getAllSubscriptions);

/**
 * @openapi
 * /api/v1/subscriptions/user:
 *   get:
 *     tags: [Subscriptions]
 *     summary: Get subscriptions for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's subscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Subscription"
 *       401:
 *         description: Unauthorized
 */
router.get("/user", authMiddleware, getUserSubscriptions);

/**
 * @openapi
 * /api/v1/subscriptions/{id}:
 *   get:
 *     tags: [Subscriptions]
 *     summary: Get subscription by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Subscription ID
 *     responses:
 *       200:
 *         description: Subscription details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Subscription"
 *       404:
 *         description: Subscription not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", authMiddleware, getSubscriptionById);

/**
 * @openapi
 * /api/v1/subscriptions:
 *   post:
 *     tags: [Subscriptions]
 *     summary: Create a new subscription
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/SubscriptionInput"
 *     responses:
 *       201:
 *         description: Subscription created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Subscription"
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, createSubscription);

/**
 * @openapi
 * /api/v1/subscriptions/{id}:
 *   put:
 *     tags: [Subscriptions]
 *     summary: Update subscription by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/SubscriptionInput"
 *     responses:
 *       200:
 *         description: Subscription updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Subscription not found
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", authMiddleware, updateSubscriptionById);

/**
 * @openapi
 * /api/v1/subscriptions/{id}:
 *   delete:
 *     tags: [Subscriptions]
 *     summary: Delete subscription by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Subscription deleted
 *       404:
 *         description: Subscription not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", authMiddleware, deleteSubscriptionById);

/**
 * @openapi
 * /api/v1/subscriptions/{id}/cancel:
 *   post:
 *     tags: [Subscriptions]
 *     summary: Cancel a subscription by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subscription canceled
 *       404:
 *         description: Subscription not found
 *       401:
 *         description: Unauthorized
 */
router.post("/:id/cancel", authMiddleware, cancelSubscriptionById);

export default router;
