import BtnResetTableFilters from "@/shared/components/BtnResetTableFilters";
import InputWithIcon from "@/shared/components/InputWithIcon";
import TableSelectionDelete from "@/shared/components/TableSelectionDelete";
import { Button } from "@/shared/components/ui/button";
import { useDataTable } from "@/shared/hooks/useDataTable";
import { PlusCircle, X } from "lucide-react";
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

  function handleClearInput() {
    table.resetColumnFilters();
  }

  return (
    <div className="flex gap-x-2 py-4 justify-between items-center">
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
        <TableSelectionDelete
          onDelete={deleteSubscription}
          isDeleting={isDeleting}
        />
      </div>
      <div className="flex gap-x-2">
        <BtnResetTableFilters table={table} />
        <SubscriptionDialog>
          <Button disabled={disabled}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Subscription
          </Button>
        </SubscriptionDialog>
      </div>
    </div>
  );
}
