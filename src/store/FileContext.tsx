import { useFileUpload } from "@/shared/hooks/use-file-upload";
import { createContext, useContext } from "react";

const FileContext = createContext(null);

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
    <FileContext.Provider value={{ fileHandlers, files, isDragging } as any}>
      {children}
    </FileContext.Provider>
  );
};

export function useFile() {
  const context = useContext(FileContext);
  if (!context)
    throw new Error(
      "You're using useFile hook outside of file context. Make sure to wrap parent component with FileProvider."
    );
  return context;
}
