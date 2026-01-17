import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { formatCurrency, formatWeeksAndDays } from "@/shared/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Clock, RefreshCwOff, RotateCcw } from "lucide-react";
import SubscriptionActions from "./SubscriptionRowAction";

export type Subscription = {
  id?: string | number;
  created_at?: string;
  name: string;
  price: number;
  active_duration: number;
  trainer?: string;
  description?: string;
  currency?: string;
  payment_type?: "recurring" | "one-time";
};

export const SubscriptionColumn: ColumnDef<Subscription>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <Checkbox
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
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "price",
    cell: ({ row }) => {
      const { price, currency } = row.original;
      return formatCurrency(price, currency);
    },
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
    cell: ({ row }) => (
      <Tooltip>
        <TooltipTrigger>
          <div className="hidden max-w-xs truncate md:table-cell">
            {row.getValue("description")}
          </div>
        </TooltipTrigger>
        <TooltipContent>{row.getValue("description")}</TooltipContent>
      </Tooltip>
    ),
  },
  {
    accessorKey: "is_recurring",
    header: "Payment Type",
    cell: ({ row }) => (
      <Badge
        variant={row.getValue("is_recurring") ? "outline" : "default"}
        className="capitalize"
      >
        {row.getValue("is_recurring") ? <RotateCcw /> : <RefreshCwOff />}
        {row.getValue("is_recurring") ? "Recurring" : "One Time"}
      </Badge>
    ),
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
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <Clock className="h-4 w-4 text-primary" />
        {formatWeeksAndDays(row.getValue("active_duration"))}
      </div>
    ),
  },
  {
    accessorKey: "action",
    header: "Actions",
    cell: ({ row }) => <SubscriptionActions row={row} />,
  },
];
