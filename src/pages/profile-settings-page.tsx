import UpdatePassword from "@/features/auth/UpdatePassword";
import ProfileDetails from "@/features/profile/ProfileDetails";

function ProfileSettingsPage() {
  return (
    <div className="grid grid-cols-2 gap-4 h-auto items-start">
      <ProfileDetails />

      <UpdatePassword />
    </div>
  );
}

export default ProfileSettingsPage;
