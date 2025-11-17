import { Separator } from "@/shared/components/ui/separator";

import { FormUserDetails } from "./FormUserDetails";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import UpdateAvatar from "./UpdateAvatar";

function ProfileDetails() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Details</CardTitle>
        <CardDescription>Update your profile picture and name.</CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>
        <UpdateAvatar />
        <FormUserDetails />
      </CardContent>
    </Card>
  );
}

export default ProfileDetails;
