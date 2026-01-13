import type { Table } from "@tanstack/react-table";
import { ArrowDownAZ, CheckSquare2, FilterX } from "lucide-react";
import { Button } from "./ui/button";

function BtnResetTableFilters<T>({ table }: { table: Table<T> }) {
  const hasColumnFilters = table.getState().columnFilters.length > 0;
  const hasSorting = table.getState().sorting.length > 0;
  const isSelected =
    table.getSelectedRowModel().rows.map((row) => row.original).length > 0;

  function handleResetFilters() {
    table.resetColumnFilters();
  }

  function handleResetSorting() {
    table.resetSorting();
  }

  function handleResetSelection() {
    table.resetRowSelection();
  }

  return (
    <div className="flex gap-x-2 items-center">
      {isSelected && (
        <Button
          size={"default"}
          variant={"warning"}
          onClick={handleResetSelection}
        >
          <CheckSquare2 />
          Reset Seletion
        </Button>
      )}
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
