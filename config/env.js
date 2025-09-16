import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development.local"}` });

export const {
  PORT,
  SERVER_URL,
  NODE_ENV,
  MONGODB_URI,
  ADMIN_ROLE,
  USER_ROLE,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  ARCJET_ENV,
  ARCJET_KEY,
  QSTASH_URL,
  QSTASH_TOKEN,
  EMAIL_PASSWORD,
  EMAIL_USER,
} = process.env;
