import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription Name is required"],
      trim: true,
      minLength: 3,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP", "JPY", "AUD", "CAD"],
      default: "USD",
      required: [true, "Currency is required"],
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      required: [true, "Billing Cycle is required"],
    },
    category: {
      type: String,
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
      default: "other",
      required: [true, "Category is required"],
    },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "debit_card", "paypal", "bank_transfer", "other"],
      default: "other",
      required: [true, "Payment Method is required"],
    },
    status: {
      type: String,
      enum: ["active", "canceled", "paused", "expired"],
      default: "active",
      required: [true, "Status is required"],
    },
    startDate: {
      type: Date,
      required: [true, "Start Date is required"],
      validate: {
        validator: function (value) {
          return value < new Date();
        },
        message: "Start Date must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      required: [true, "Renewal Date is required"],
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal Date must be after Start Date",
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },
  },
  { timestamps: true }
);
// Auto-calculate renewalDate if missing
subscriptionSchema.pre("validate", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  // Auto-update status if renewalDate has passed
  if (this.renewalDate < new Date() && this.status === "active") {
    this.status = "expired";
  }

  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
