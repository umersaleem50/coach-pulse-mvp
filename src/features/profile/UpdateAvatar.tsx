import UpdateImage from "@/shared/components/UpdateImage";
import { useUpdateProfile } from "./hooks/useUpdateProfile";
import { useAuth } from "../auth/hooks/useAuth";
import { useCallback } from "react";
import type { FileMetadata } from "@/shared/hooks/use-file-upload";
import { FileProvider } from "@/store/FileContext";
import { generateAvatarURL } from "@/shared/lib/helpers";

function UpdateAvatar() {
  const { isLoading, updateProfile } = useUpdateProfile();
  const { user } = useAuth();
  const avatarUrl = generateAvatarURL(user?.user_metadata.avatar_url);
  const nameStartLetter = user?.user_metadata.full_name.slice(0, 1);
  const nameEndLetter = user?.user_metadata.full_name
    .split(" ")
    ?.at(1)
    .slice(0, 1);
  const fallback = nameStartLetter + nameEndLetter;

  const handleUpdateAvatar = useCallback(update, [updateProfile]);

  function update(file: File | FileMetadata) {
    updateProfile({ avatar: file });
  }
  return (
    <FileProvider>
      <UpdateImage
        avatarUrl={avatarUrl}
        fallBack={fallback}
        isLoading={isLoading}
        onImageSelect={handleUpdateAvatar}
      />
    </FileProvider>
  );
}

export default UpdateAvatar;
