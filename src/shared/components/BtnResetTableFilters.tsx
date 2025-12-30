import { Button } from "./ui/button";
import { FilterX } from "lucide-react";
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
    <>
      {hasColumnFilters && (
        <Button size={"sm"} variant={"warning"} onClick={handleResetFilters}>
          <FilterX />
          Reset Filters
        </Button>
      )}
      {hasSorting && (
        <Button size={"sm"} variant={"outline"} onClick={handleResetSorting}>
          <FilterX />
          Reset Sorting
        </Button>
      )}
    </>
  );
}

export default BtnResetTableFilters;
