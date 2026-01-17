import z from "zod";

export const subscriptionFormSchema = z
  .object({
    id: z.string().optional(),
    name: z
      .string()
      .min(1, "Provide name for plan.")
      .max(255, "Keep name short."),
    price: z.number().min(1, "Please provide price for plan."),
    description: z.string().optional(),
    active_duration: z.number().optional(),
    currency: z.enum(["USD", "GBP", "EUR", "PKR"]).optional(),
    is_recurring: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.is_recurring && !data.active_duration) {
      ctx.addIssue({
        path: ["active_duration"],
        message: "Subscription duration is required for recurring plans.",
        code: "custom",
      });
    }
  });

export type SubscriptionType = z.infer<typeof subscriptionFormSchema>;
