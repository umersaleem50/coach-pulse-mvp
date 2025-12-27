import { FormUserDetails } from "./FormUserDetails";
import { Card, CardContent } from "@/shared/components/ui/card";
import UpdateAvatar from "./UpdateAvatar";

function ProfileDetails() {
  return (
    <Card>
      <CardContent>
        <UpdateAvatar />
        <FormUserDetails />
      </CardContent>
    </Card>
  );
}

export default ProfileDetails;
