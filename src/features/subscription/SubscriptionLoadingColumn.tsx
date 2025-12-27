import { ArrowUpDown } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";

export type Subscription = {
  created_at: string;
  name: string;
  price: number;
  active_duration: number;
  trainer: string;
  id: string;
  description?: string;
  currency?: string;
  payment_type?: "recurring" | "one-time";
};

export const SubscriptionLoadingColumn: ColumnDef<Subscription>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <Checkbox
        disabled
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select All"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        disabled
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select Row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div className="flex items-center gap-1">
        Name
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowUpDown className="h-3 w-3" />
        </Button>
      </div>
    ),
    cell: () => <Skeleton className="w-20 h-5" />,
  },
  {
    accessorKey: "price",
    cell: () => <Skeleton className="w-20 h-5" />,
    header: ({ column }) => (
      <div className="flex items-center gap-1">
        Price
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowUpDown className="h-3 w-3" />
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: () => <div className="hidden md:table-cell">Description</div>,
    cell: () => <Skeleton className="h-5 max-w-xs w-full" />,
  },
  {
    accessorKey: "is_recurring",
    header: "Payment Type",
    cell: () => <Skeleton className="w-20 h-5" />,
  },

  {
    accessorKey: "active_duration",
    header: ({ column }) => (
      <div className="flex items-center gap-1">
        Duration
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowUpDown className="h-3 w-3" />
        </Button>
      </div>
    ),
    cell: () => <Skeleton className="w-26 h-5" />,
  },
  {
    accessorKey: "action",
    header: "Actions",
    cell: () => <Skeleton className="w-5 h-5" />,
  },
];
