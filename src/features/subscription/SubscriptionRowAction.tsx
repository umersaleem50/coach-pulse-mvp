import { MoreHorizontalIcon } from "lucide-react";
import type { Row } from "@tanstack/react-table";
import type { Subscription } from "./SubscriptionColumn";
import { useDeleteSubscription } from "./hooks/useDeleteSubscription";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu.tsx";
import { Button } from "@/shared/components/ui/button";
import SubscriptionDialog from "./SubscriptionDialog";
import { Spinner } from "@/shared/components/ui/spinner";

const SubcriptionRowActions = ({ row }: { row: Row<Subscription> }) => {
  const { isDeleting, deleteSubscription } = useDeleteSubscription();
  const { id } = row.original;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
          size="icon"
        >
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32 space-y-1">
        <SubscriptionDialog data={row.original}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            Edit
          </DropdownMenuItem>
        </SubscriptionDialog>
        <DropdownMenuItem
          variant="destructive"
          onSelect={(e) => {
            e.preventDefault();
            deleteSubscription({ subscriptionId: id });
          }}
          disabled={isDeleting}
        >
          {isDeleting && <Spinner />} Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SubcriptionRowActions;
