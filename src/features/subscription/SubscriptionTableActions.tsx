import { PlusCircle, Trash, X } from "lucide-react";
import type { Subscription } from "./SubscriptionColumn";
import { useDataTable } from "@/shared/hooks/useDataTable";
import { Button } from "@/shared/components/ui/button";
import { Spinner } from "@/shared/components/ui/spinner";
import InputWithIcon from "@/shared/components/InputWithIcon";
import SubscriptionDialog from "./SubscriptionDialog";
import { useDeleteSubscription } from "./hooks/useDeleteSubscription";

export interface ISubscriptionActions {
  disabled?: boolean;
}

export function SubscriptionTableActions({
  disabled = false,
}: ISubscriptionActions) {
  const { table } = useDataTable();
  const { deleteSubscription, isDeleting } = useDeleteSubscription();

  const selectedRows = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  const selectedRowsID = (selectedRows as Subscription[]).map(
    (subscription: Subscription) => subscription.id
  );

  function handleResetSelection() {
    table.resetRowSelection();
  }

  function handleClearInput() {
    table.resetColumnFilters();
  }

  return (
    <div className="flex gap-x-2 py-4 justify-between">
      <div className="flex items-center gap-x-4">
        <InputWithIcon
          icon={<X size={16} onClick={handleClearInput} />}
          placeholder="Search"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            table.getColumn("name")?.setFilterValue(e.target.value)
          }
          disabled={disabled}
        />
        {selectedRows.length ? (
          <>
            <Button variant={"outline"} onClick={handleResetSelection}>
              Reset
              <X />
            </Button>
            <Button
              variant={"destructive"}
              size={"default"}
              disabled={isDeleting}
              onClick={() =>
                deleteSubscription(
                  { subscriptionId: selectedRowsID },
                  { onSuccess: handleResetSelection }
                )
              }
            >
              {isDeleting ? <Spinner /> : <Trash />} Delete Selected
            </Button>
          </>
        ) : null}
      </div>
      <SubscriptionDialog>
        <Button size="sm" disabled={disabled}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Subscription
        </Button>
      </SubscriptionDialog>
    </div>
  );
}
