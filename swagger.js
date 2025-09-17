import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { SERVER_URL } from "./config/env.js";

const swaggerDefinition = {
  openapi: "3.0.3",
  info: {
    title: "Subscription Tracker API",
    version: "1.0.0",
    description: "API to manage user subscriptions and reminders",
  },
  servers: [
    {
      url: SERVER_URL || "http://localhost:5500",
      description: "Local server",
    },
    {
      url: "https://subscription-tracker-api-hir7.onrender.com",
      description: "Production server (Render)",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      SubscriptionInput: {
        type: "object",
        properties: {
          name: { type: "string", minLength: 3, maxLength: 100 },
          price: { type: "number", minimum: 0 },
          currency: {
            type: "string",
            enum: ["USD", "EUR", "GBP", "JPY", "AUD", "CAD"],
          },
          frequency: {
            type: "string",
            enum: ["daily", "weekly", "monthly", "yearly"],
          },
          category: {
            type: "string",
            enum: [
              "sports",
              "news",
              "entertainment",
              "lifestyle",
              "technology",
              "finance",
              "politics",
              "productivity",
              "education",
              "health",
              "other",
            ],
          },
          paymentMethod: {
            type: "string",
            enum: [
              "credit_card",
              "debit_card",
              "paypal",
              "bank_transfer",
              "other",
            ],
          },
          status: {
            type: "string",
            enum: ["active", "canceled", "paused", "expired"],
          },
          startDate: { type: "string", format: "date" },
          renewalDate: { type: "string", format: "date" },
        },
        required: [
          "name",
          "price",
          "currency",
          "frequency",
          "category",
          "paymentMethod",
          "startDate",
        ],
      },

      Subscription: {
        allOf: [
          { $ref: "#/components/schemas/SubscriptionInput" },
          {
            type: "object",
            properties: {
              id: { type: "string" },
              user: { type: "string" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
        ],
      },

      User: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          email: { type: "string", format: "email" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      RegisterInput: {
        type: "object",
        properties: {
          name: { type: "string", minLength: 3 },
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 6 },
        },
        required: ["name", "email", "password"],
      },
      LoginInput: {
        type: "object",
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string" },
        },
        required: ["email", "password"],
      },
      AuthResponse: {
        type: "object",
        properties: {
          token: { type: "string" },
          user: { $ref: "#/components/schemas/User" },
        },
      },
      UpdateUserInput: {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string", format: "email" },
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const options = {
  swaggerDefinition,
  apis: ["./docs-version/routes/*.docs.js"], // point to docs-version route files
};

export const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
