import { CircleUserRoundIcon, Image, XIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  useFileUpload,
  type FileMetadata,
  type FileUploadActions,
} from "@/shared/hooks/use-file-upload";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { useEffect } from "react";
import { useFile } from "@/store/FileContext";
import { BUCKET_URLS } from "@/lib/constants";
import { Skeleton } from "./ui/skeleton";

export interface IUpdateImage {
  onImageSelect: (file: File | FileMetadata) => void;
  isLoading: boolean;
  avatarUrl?: string;
  fallBack?: string;
}

export default function UpdateImage({
  onImageSelect,
  isLoading,
  avatarUrl,
  fallBack,
}: IUpdateImage) {
  const { fileHandlers, files, isDragging } = useFile();

  const {
    removeFile,
    openFileDialog,
    getInputProps,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  } = fileHandlers as FileUploadActions;

  const file = files[0]?.file;

  useEffect(() => {
    if (!files?.length) return;
    onImageSelect(file);
  }, [file, files, onImageSelect]);

  const previewUrl = files[0]?.preview || avatarUrl || null;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative inline-flex">
        {/* Drop area */}
        <div
          className="border-input bg-primary/20 hover:bg-primary/50 data-[dragging=true]:bg-primary/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex size-16 items-center justify-center overflow-hidden rounded-full border border-dashed transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none has-[input:focus]:ring-[3px]"
          role="button"
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          aria-label={previewUrl ? "Change image" : "Upload image"}
        >
          <Avatar className="size-full flex items-center justify-center">
            {isLoading && <Skeleton />}
            {!isLoading && previewUrl ? (
              <>
                <AvatarImage
                  className="object-cover"
                  src={previewUrl}
                  alt={files[0]?.file?.name || "Uploaded image"}
                  style={{ objectFit: "cover" }}
                ></AvatarImage>
                <AvatarFallback>{fallBack}</AvatarFallback>
              </>
            ) : (
              <Image />
            )}
          </Avatar>
        </div>
        {previewUrl && (
          <Button
            onClick={() => removeFile(files[0]?.id)}
            size="icon"
            className="border-background focus-visible:border-background absolute -top-1 -right-1 size-6 rounded-full border-2 shadow-none"
            aria-label="Remove image"
          >
            <XIcon className="size-3.5" />
          </Button>
        )}
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image file"
        />
      </div>
      <p
        aria-live="polite"
        role="region"
        className="text-muted-foreground mt-2 text-xs"
      >
        {isLoading ? "Updating..." : "Click to update"}
        {/* <a
          href="https://github.com/origin-space/originui/tree/main/docs/use-file-upload.md"
          className="hover:text-foreground underline"
        >
          API
        </a> */}
      </p>
    </div>
  );
}
