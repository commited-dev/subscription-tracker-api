# Subscription Tracker API

A robust RESTful API for managing user subscriptions, tracking billing cycles, and handling subscription-related operations. Built with modern backend technologies to provide a scalable solution for subscription management systems.

## Features

- **User Authentication & Authorization**

  - JWT-based authentication
  - Role-based access control
  - Secure password hashing

- **Subscription Management**

  - Create, read, update, and delete subscriptions
  - Multiple subscription tiers and plans
  - Subscription status tracking (active, paused, cancelled, expired)
  - Billing cycle management (daily, weekly, monthly, yearly)

- **Notifications & Reminders**
  - Email notifications for upcoming renewals

## Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Email Service:** Nodemailer
- **Documentation:** Swagger/OpenAPI

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v22 or higher)
- npm or yarn
- Git
- MongoDB -> MongoDB Atlas -> https://www.mongodb.com/cloud/atlas/register
- Upstash -> https://upstash.com/docs/workflow/quickstarts/express
- Arcjet -> https://app.arcjet.com/auth/signin
- Nodemailer -> https://nodemailer.com/

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/commited-dev/subscription-tracker-api.git
   cd subscription-tracker-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env.development.local` file in the root directory and add the following variables:

   ```env

    NODE_ENV="development"

    PORT=5500

    SERVER_URL="http://localhost:5500"

    MONGODB_URI="your_mongodb_uri_here"

    ADMIN_ROLE="admin"

    USER_ROLE="user"

    JWT_SECRET="your_jwt_secret_key"

    JWT_EXPIRES_IN="1d"

    ARCJET_KEY="arcjet_key"

    ARCJET_ENV="development"

    QSTASH_URL="http://127.0.0.1:8080"

    QSTASH_TOKEN="upstash_token"

    EMAIL_PASSWORD="your_email_password"

    EMAIL_USER="admin@example.com"

   ```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The API will be available at `http://localhost:5500`

### Production

Build and start the production server:

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## API Documentation

### Base URL

```
http://localhost:5500/api/v1
```

### Authentication

All protected endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Endpoints

#### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

#### Users

- `GET /users` - Get all users (admin only)
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user profile
- `DELETE /users/:id` - Delete user account (admin only)

#### Subscriptions

- `GET /subscriptions` - Get all subscriptions (admin only, general list)
- `POST /subscriptions` - Create new subscription
- `GET /subscriptions/user` - Get subscriptions for authentificated user
- `GET /subscriptions/:id` - Get all subscription by ID
- `PUT /subscriptions/:id` - Update subscription by Id
- `DELETE /subscriptions/:id` - Delete subscription by ID

### Example Requests

#### Register a new user

```bash
curl -X POST http://localhost:5500/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.dow@example.com",
    "password": "securePassword123",
  }'
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
