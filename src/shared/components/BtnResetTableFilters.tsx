import { Button } from "./ui/button";
import { ArrowDownAZ, FilterX } from "lucide-react";
import type { Table } from "@tanstack/react-table";

function BtnResetTableFilters<T>({ table }: { table: Table<T> }) {
  const hasColumnFilters = table.getState().columnFilters.length > 0;
  const hasSorting = table.getState().sorting.length > 0;

  function handleResetFilters() {
    table.resetColumnFilters();
  }

  function handleResetSorting() {
    table.resetSorting();
  }

  return (
    <div className="flex gap-x-2 items-center">
      {hasColumnFilters && (
        <Button
          size={"default"}
          variant={"warning"}
          onClick={handleResetFilters}
        >
          <FilterX />
          Reset Filters
        </Button>
      )}
      {hasSorting && (
        <Button
          size={"default"}
          variant={"outline"}
          onClick={handleResetSorting}
        >
          <ArrowDownAZ />
          Reset Sorting
        </Button>
      )}
    </div>
  );
}

export default BtnResetTableFilters;
