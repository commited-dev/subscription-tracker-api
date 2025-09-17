import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../../controllers/userController.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users (admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/User"
 *               example:
 *                 success: true
 *                 data:
 *                   - id: "64f8c1d2a1b2c3d4e5f6g7h7"
 *                     name: "John Doe"
 *                     email: "john@example.com"
 *                     role: "user"
 *                     createdAt: "2025-09-16T12:00:00.000Z"
 *                     updatedAt: "2025-09-16T12:00:00.000Z"
 *                   - id: "64f8c1d2a1b2c3d4e5f6g7h8"
 *                     name: "Jane Admin"
 *                     email: "jane@example.com"
 *                     role: "admin"
 *                     createdAt: "2025-09-16T12:05:00.000Z"
 *                     updatedAt: "2025-09-16T12:05:00.000Z"
 */
router.get("/", authMiddleware, getAllUsers);

/**
 * @openapi
 * /api/v1/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *         description: User ID
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data: { $ref: "#/components/schemas/User" }
 *               example:
 *                 success: true
 *                 data:
 *                   id: "64f8c1d2a1b2c3d4e5f6g7h7"
 *                   name: "John Doe"
 *                   email: "john@example.com"
 *                   role: "user"
 *                   createdAt: "2025-09-16T12:00:00.000Z"
 *                   updatedAt: "2025-09-16T12:00:00.000Z"
 */
router.get("/:id", authMiddleware, getUserById);

/**
 * @openapi
 * /api/v1/users/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Update user (self or admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateUserInput"
 *             example:
 *               name: "John Updated"
 *               email: "john.updated@example.com"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 message: { type: string }
 *                 data: { $ref: "#/components/schemas/User" }
 *               example:
 *                 success: true
 *                 message: "User updated successfully"
 *                 data:
 *                   id: "64f8c1d2a1b2c3d4e5f6g7h7"
 *                   name: "John Updated"
 *                   email: "john.updated@example.com"
 *                   role: "user"
 *                   createdAt: "2025-09-16T12:00:00.000Z"
 *                   updatedAt: "2025-09-16T12:30:00.000Z"
 *       400:
 *         description: No valid fields to update
 *       403:
 *         description: Forbidden (cannot update other user or change role)
 *       404:
 *         description: User not found
 */
router.put("/:id", authMiddleware, updateUser);

/**
 * @openapi
 * /api/v1/users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete user (admin, cannot delete self)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 message: { type: string }
 *                 data: { $ref: "#/components/schemas/User" }
 *               example:
 *                 success: true
 *                 message: "User deleted successfully"
 *                 data:
 *                   id: "64f8c1d2a1b2c3d4e5f6g7h8"
 *                   name: "Jane Admin"
 *                   email: "jane@example.com"
 *                   role: "admin"
 *                   createdAt: "2025-09-16T12:05:00.000Z"
 *                   updatedAt: "2025-09-16T12:05:00.000Z"
 *       400:
 *         description: Cannot delete self
 *       404:
 *         description: User not found
 */
router.delete("/:id", authMiddleware, deleteUser);

export default router;
