import Subscription from "../models/subscription.model.js";

export const getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find();

    res.status(200).json({
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subscription = await Subscription.findById(id);

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

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

// Handle updating a subscription by ID here
export const updateSubscriptionById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedSubscription = await Subscription.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedSubscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: updatedSubscription,
    });
  } catch (error) {
    next(error);
  }
};

// Handle deleting a subscription by ID here
export const deleteSubscriptionById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedSubscription = await Subscription.findByIdAndDelete(id);

    if (!deletedSubscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Subscription deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Handle cancel subscription by ID here
export const cancelSubscriptionById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const subscription = await Subscription.findById(id);

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }

    subscription.status = "canceled";
    await subscription.save();

    res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};
