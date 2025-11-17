import { z } from "zod";
import { Button } from "@/shared/components/ui/button";

import { Input } from "@/shared/components/ui/input";

import { useUpdateProfile } from "./hooks/useUpdateProfile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/components/ui/form";

import { useAuth } from "../auth/hooks/useAuth";
import { useEffect } from "react";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import { AlertCircle } from "lucide-react";

const profileFormSchema = z.object({
  full_name: z
    .string()
    .min(1)
    .max(225, { message: "Please keep your fullname under 225 chars." }),
  email: z.email(),
});

export function FormUserDetails({ onSuccess = () => {} }: { onSuccess?: any }) {
  const { user } = useAuth();
  const { updateProfile, isLoading } = useUpdateProfile();

  const isProviderEmail = user?.app_metadata.provider !== "email";

  const form = useForm<z.inter<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      full_name: "",
      email: "",
    },
  });

  useEffect(() => {
    form.setValue("full_name", user?.user_metadata?.full_name);
    form.setValue("email", user?.email);
  }, [form, user]);

  const onSubmit = (values: z.infer<typeof profileFormSchema>) => {
    updateProfile(values, { onSuccess });
  };

  // if (!isAuthenticated) {
  //   return <Navigate to={"/signup"} replace />;
  // }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fullname</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          disabled={isProviderEmail}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              {isProviderEmail && (
                <FormDescription>
                  <Alert variant={"destructive"}>
                    <AlertCircle />
                    <AlertDescription>
                      You can't update your email as it's linked with your{" "}
                      {user?.app_metadata.provider}'s account
                    </AlertDescription>
                  </Alert>
                </FormDescription>
              )}
            </FormItem>
          )}
        />
        <Button
          className="self-start mt-4 w-full"
          type="submit"
          isLoading={isLoading}
        >
          Update Account
        </Button>
      </form>
    </Form>
  );
}
