import express from "express";
import { register, login, logout } from "../../controllers/authController.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     tags: [Authentication]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/RegisterInput"
 *             example:
 *               name: "John Doe"
 *               email: "john@example.com"
 *               password: "password123"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: "#/components/schemas/User"
 *                     token:
 *                       type: string
 *               example:
 *                 success: true
 *                 message: "User created successfully"
 *                 data:
 *                   user:
 *                     id: "64f8c1d2a1b2c3d4e5f6g7h7"
 *                     name: "John Doe"
 *                     email: "john@example.com"
 *                     role: "user"
 *                     createdAt: "2025-09-16T12:00:00.000Z"
 *                     updatedAt: "2025-09-16T12:00:00.000Z"
 *                   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       409:
 *         description: User already exists
 *       400:
 *         description: Validation error
 */
router.post("/register", register);

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/LoginInput"
 *             example:
 *               email: "john@example.com"
 *               password: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: "#/components/schemas/User"
 *                     token:
 *                       type: string
 *               example:
 *                 success: true
 *                 message: "Login successful"
 *                 data:
 *                   user:
 *                     id: "64f8c1d2a1b2c3d4e5f6g7h7"
 *                     name: "John Doe"
 *                     email: "john@example.com"
 *                     role: "user"
 *                     createdAt: "2025-09-16T12:00:00.000Z"
 *                     updatedAt: "2025-09-16T12:00:00.000Z"
 *                   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 */
router.post("/login", login);

/**
 * @openapi
 * /api/v1/auth/logout:
 *   post:
 *     tags: [Authentication]
 *     summary: Logout user (placeholder)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Logout route"
 */
router.post("/logout", authMiddleware, logout);

export default router;
