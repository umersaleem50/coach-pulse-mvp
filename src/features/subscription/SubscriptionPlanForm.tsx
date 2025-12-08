import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateSubscription } from "./hooks/use-create-subscription";
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
import InputWithSelect from "@/shared/components/input-with-select";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import InputAddOn from "@/shared/components/InputAddOn";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Provide name for plan.")
    .max(255, "Keep name short."),
  price: z.number().min(1, "Please provide price for plan."),
  description: z.string(),
  active_duration: z.number().min(1, "Duration should be of atleast 1 day."),
});

function SubscriptionPlanForm({ children, onSuccess = () => {} }) {
  const { createSubscription, isPending } = useCreateSubscription();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: "",
      price: 9.99,
      active_duration: 30,
      description: "",
    },
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createSubscription(values, {
      onSuccess: () => {
        form.reset();
        onSuccess();
      },
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
                <InputWithSelect
                  {...field}
                  placeholder={"0.00"}
                  selected="dollar"
                  onChange={(e) => field.onChange(Number(e.target.value))}
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
        <div className="justify-end flex gap-x-4">
          {children}
          <Button className="self-end" isLoading={isPending} type="submit">
            Create Plan
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default SubscriptionPlanForm;
