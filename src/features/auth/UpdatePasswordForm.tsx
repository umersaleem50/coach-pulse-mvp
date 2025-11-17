import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import Password from "@/shared/components/password-with-check";
import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";

import { useUpdateProfile } from "../profile/hooks/useUpdateProfile";
import PasswordCheckInput from "@/shared/components/password-with-check";

const passwordFormSchema = z.object({
  password: z
    .string()
    .min(8, "Password should've atleast 8 chars.")
    .max(255, "Password should've be less than 255 chars."),
  passwordConfirm: z.string(),
});

function UpdatePasswordForm() {
  const { updateProfile, isLoading } = useUpdateProfile();

  const form = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  function onSubmit(values: z.infer<typeof passwordFormSchema>) {
    updateProfile(
      { password: values.password },
      {
        onSuccess: () => {
          toast("Password updated successfully!");
          form.reset();
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-y-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Password {...field} placeholder="Enter new password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <PasswordCheckInput
                    {...field}
                    placeholder="Confirm new password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit" className="self-start my-4" isLoading={isLoading}>
          Update Password
        </Button>
      </form>
    </Form>
  );
}

export default UpdatePasswordForm;
