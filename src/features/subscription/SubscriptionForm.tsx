import z from "zod";
import { useCreateSubscription } from "./hooks/useCreateSubscription";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import InputAddOn from "@/shared/components/InputAddOn";
import { Button } from "@/shared/components/ui/button";
import CurrencyInput from "@/shared/components/CurrencyInput";
import type { SUPPORTED_CURRENCIES_TYPES } from "@/constants";
import { useUpdateSubscription } from "./hooks/useUpdateSubscription";
import { Switch } from "@/shared/components/ui/switch";
import { formatCurrency } from "@/shared/lib/utils";

export const subscriptionFormSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, "Provide name for plan.")
    .max(255, "Keep name short."),
  price: z.number().min(1, "Please provide price for plan."),
  description: z.string().optional(),
  active_duration: z.number().min(1, "Duration should be of atleast 1 day."),
  currency: z.enum(["USD", "GBP", "EUR"]).optional(),
  is_recurring: z.boolean().optional(),
});

const defaultValues = {
  name: "",
  price: 9.99,
  active_duration: 30,
  description: "",
  currency: "USD",
  is_recurring: true,
};

function SubscriptionForm({
  children,
  onSuccess,
  data,
}: {
  children: React.ReactNode;
  onSuccess: any;
  data?: z.infer<typeof subscriptionFormSchema>;
}) {
  const { isPending: isCreating, createSubscription } = useCreateSubscription();
  const { isUpdatingSubscription, updateSubscription } =
    useUpdateSubscription();

  const form = useForm<z.infer<typeof subscriptionFormSchema>>({
    defaultValues: (data || defaultValues) as z.infer<
      typeof subscriptionFormSchema
    >,
    resolver: zodResolver(subscriptionFormSchema),
  });

  const currency = form.watch("currency");
  const platformFee = 0;
  const totalCost = form.watch("price") + platformFee;

  function onSubmit(values: z.infer<typeof subscriptionFormSchema>) {
    if (!data) {
      createSubscription(values, {
        onSuccess: () => {
          form.reset();
          onSuccess();
        },
      });
    } else {
      updateSubscription(
        { id: data?.id as string, payload: values },
        {
          onSuccess: () => {
            form.reset();
            onSuccess();
          },
        }
      );
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-y-4 min-w-64"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="is_recurring"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>
                  Billing type :{" "}
                  <span className="text-primary">
                    {field.value ? "Recurring" : "One-time"}
                  </span>
                </FormLabel>
                <FormDescription>
                  {field.value
                    ? "The payment provider will automatically charge the subscription once it's expired."
                    : "The payment will be paid once. i.e. Registration fee or cancellation fee."}
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Beginner Plan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                {/* <Input placeholder="Beginner Plan" {...field} /> */}
                <CurrencyInput
                  {...field}
                  selected={form.getValues("currency")}
                  placeholder={"0.00"}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  onSelect={(value: SUPPORTED_CURRENCIES_TYPES) =>
                    form.setValue("currency", value)
                  }
                  // currency={form.getValues("currency")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide more details about plan"
                  maxLength={255}
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="active_duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subscription Duration</FormLabel>
              <FormControl>
                <InputAddOn
                  endAddOn="Days"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                This defines when the next payment will be taken.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="justify-end flex gap-x-4 items-center">
          <div className=" self-center mr-auto">
            <p className="text-muted-foreground flex items-center justify-center ">
              <span className="text-xs">
                {formatCurrency(form.watch("price"), currency)} +{" "}
                {formatCurrency(platformFee, currency)}(platform fee) =
              </span>
              <span className="text-md text-primary font-semibold ml-1">
                {formatCurrency(totalCost, currency)}
              </span>
            </p>
          </div>
          {children}
          <Button
            className="self-end"
            isLoading={isUpdatingSubscription || isCreating}
            type="submit"
          >
            {data ? "Update" : "Create"} Plan
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default SubscriptionForm;
