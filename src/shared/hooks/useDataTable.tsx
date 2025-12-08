import {
  DataTableContext,
  type DataTableContextType,
} from "@/store/DataTableContext";
import { useContext } from "react";

export function useDataTable<TData>() {
  const context = useContext(
    DataTableContext
  ) as DataTableContextType<TData> | null;
  if (!context)
    throw Error(
      "DataTable Context is being used outside of the DataTableProvider."
    );
  return context;
}
