import { Spinner } from "@/shared/components/ui/spinner";
import { useSubcriptions } from "./hooks/useSubscriptions";
import { DataTableProvider } from "@/store/DataTableContext";
import { SubscriptionTableActions } from "./SubscriptionTableActions";
import DataTable from "@/shared/components/ui/data-table";
import { SubscriptionColumn } from "./SubscriptionColumn";

export function SubcriptionTable() {
  const { isPending, subscriptions } = useSubcriptions();

  if (isPending) return <Spinner />;

  return (
    <div className="space-y-4 px-4 py-6 lg:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
        <DataTableProvider
          data={subscriptions || []}
          columns={SubscriptionColumn}
        >
          <SubscriptionTableActions />
          <DataTable />
        </DataTableProvider>
      </div>
    </div>
  );
}
