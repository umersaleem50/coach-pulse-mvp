import { Button } from "@/shared/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/shared/components/ui/empty";
import { AlertCircle } from "lucide-react";

function ErrorCard({
  error,
  onRetry,
}: {
  error: Error | null;
  onRetry: () => void;
}) {
  if (!error) return null;

  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyTitle className="flex items-center gap-x-2">
          <AlertCircle />
          {error?.name}
        </EmptyTitle>
      </EmptyHeader>
      <EmptyContent>
        <EmptyDescription>{error?.message}</EmptyDescription>
        <div className="flex gap-x-2">
          <Button onClick={onRetry}>Try Again</Button>
          {/* <Button variant={"outline"}>Report Issue</Button> */}
        </div>
      </EmptyContent>
    </Empty>
  );
}

export default ErrorCard;
