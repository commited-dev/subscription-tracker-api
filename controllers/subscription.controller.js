import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Check if the user is the same as the authenticated user
    if (req.user.id !== id) {
      const error = new Error("Unauthorized access to user subscriptions");
      error.statusCode = 403;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: id });

    res.status(200).json({
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};
