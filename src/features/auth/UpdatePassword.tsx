import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import UpdatePasswordForm from "./UpdatePasswordForm";
import { Separator } from "@/shared/components/ui/separator";

function UpdatePassword() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Password</CardTitle>
        <CardDescription>You can update your password here.</CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>
        <UpdatePasswordForm />
      </CardContent>
    </Card>
  );
}

export default UpdatePassword;
