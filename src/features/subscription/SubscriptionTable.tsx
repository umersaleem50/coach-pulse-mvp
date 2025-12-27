import { useSubcriptions } from "./hooks/useSubscriptions";
import { DataTableProvider } from "@/store/DataTableContext";
import { SubscriptionTableActions } from "./SubscriptionTableActions";
import DataTable from "@/shared/components/ui/data-table";
import { SubscriptionColumn, type Subscription } from "./SubscriptionColumn";
import { SubscriptionLoadingColumn } from "./SubscriptionLoadingColumn";

export function SubcriptionTable() {
  const { isPending, subscriptions } = useSubcriptions();

  const columns = isPending ? SubscriptionLoadingColumn : SubscriptionColumn;
  const data = isPending ? Array.from({ length: 2 }) : subscriptions;

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-2 md:mb-3 lg:mb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Subscription Plans
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your project's available subscription plans
          </p>
        </div>
      </div>
      <div className="rounded-md border p-2">
        <DataTableProvider data={data as Subscription[]} columns={columns}>
          <SubscriptionTableActions disabled={isPending} />
          <DataTable />
          <DataTable.Pagination disabled={isPending} />
        </DataTableProvider>
      </div>
    </>
  );
}
