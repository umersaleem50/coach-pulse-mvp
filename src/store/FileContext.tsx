import {
  useFileUpload,
  type FileUploadActions,
  type FileWithPreview,
} from "@/shared/hooks/use-file-upload";
import { createContext, useContext } from "react";

export interface FileProviderProps {
  fileHandlers: FileUploadActions;
  files: FileWithPreview[];
  isDragging: boolean;
}

const FileContext = createContext<FileProviderProps | null>(null);

export const FileProvider = ({
  children,
  acceptType = "image/*",
}: {
  children: React.ReactNode;
  acceptType?: string;
}) => {
  const [{ files, isDragging }, fileHandlers] = useFileUpload({
    accept: acceptType,
  });
  return (
    <FileContext.Provider
      value={{ fileHandlers, files, isDragging } as FileProviderProps}
    >
      {children}
    </FileContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useFile() {
  const context = useContext(FileContext);
  if (!context)
    throw new Error(
      "You're using useFile hook outside of file context. Make sure to wrap parent component with FileProvider."
    );
  return context;
}
