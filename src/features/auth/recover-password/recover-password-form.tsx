import { cn } from "@/shared/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/shared/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/shared/components/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Link } from "react-router";
import AuthFormHeader from "../auth-form-header";
import { usePassworRecovery } from "./hooks/usePasswordRecovery";

const recoverPasswordSchema = z.object({
  email: z.string().email("Please provide your email."),
});

export function RecoverPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const form = useForm<z.infer<typeof recoverPasswordSchema>>({
    resolver: zodResolver(recoverPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { passwordRecovery, isLoading } = usePassworRecovery();

  function onSubmit(values: z.infer<typeof recoverPasswordSchema>) {
    passwordRecovery(values);
  }

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6", className)}
        {...props}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <AuthFormHeader
            title="Recover Password"
            description="Forgot your password? Don't worry, enter your email to recover."
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Field>
            <Button type="submit" isLoading={isLoading}>
              Send Recovery Email
            </Button>
            <FieldDescription>
              <b>Note: </b>Provide the email that is linked to your account,
              your will recieve a recovery email.
            </FieldDescription>
          </Field>

          <FieldSeparator>Or</FieldSeparator>
          <Field>
            <FieldDescription className="text-center">
              Don&apos;t have an account?{" "}
              <Link to="/auth/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </Form>
  );
}
