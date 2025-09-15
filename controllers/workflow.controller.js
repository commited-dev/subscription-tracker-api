import dayjs from "dayjs";

// workaround to use commonjs in es modules
import { createRequire } from "module";
const require = createRequire(import.meta.url);
// because 'require' is a commonjs is not allowed in es modules we have to use this workaround from above
const { serve } = require("@upstash/workflow/express");
// ends here

import { sendReminderEmail } from "../utils/send-email.js";

import Subscription from "../models/subscription.model.js";

const REMINDERS = [7, 5, 2, 1]; // days before renewal to send reminders

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== "active") return;

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    // Here you would integrate with an email service to send the reminder
    console.log(
      `Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`
    );
    return;
  }

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");

    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(
        context,
        `Reminder ${daysBefore} days before`,
        reminderDate
      );
    }

    await triggerReminder(
      context,
      `${daysBefore} days before reminder`,
      subscription
    );
  }

  console.log(
    `All reminders sent for subscription ${subscriptionId}. Stopping workflow.`
  );
  return;
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("Fetch Subscription", async () => {
    return await Subscription.findById(subscriptionId).populate(
      "user",
      "name email"
    );
  });
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`);

  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label, subscription) => {
  return await context.run(label, async () => {
    console.log(`Triggering ${label} reminder`);

    await sendReminderEmail({
      to: subscription.user.email,
      type: label,
      subscription,
    });
    console.log(`Sent ${label} reminder to ${subscription.user.email}`);
  });
};
