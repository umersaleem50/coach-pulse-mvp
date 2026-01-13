import { Trash, X } from "lucide-react";
import { useDataTable } from "../hooks/useDataTable";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

// Generic type for the table rows
type TableRow = {
  id: string; // make sure your rows have an id
  [key: string]: unknown;
};

// Type for handleDelete function
type HandleDeleteParams = {
  ids: string[];
};

type HandleDeleteOptions = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

type HandleDelete = (
  params: HandleDeleteParams,
  options?: HandleDeleteOptions
) => void;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface TableSelectionDeleteProps<T extends TableRow> {
  isDeleting: boolean;
  onDelete: HandleDelete;
}

function TableSelectionDelete<T extends TableRow>({
  isDeleting,
  onDelete,
}: TableSelectionDeleteProps<T>) {
  const { table } = useDataTable();

  const selectedRows = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  const selectedRowsID = (selectedRows as T[]).map((row) => row.id);

  function handleResetSelection() {
    table.resetRowSelection();
  }

  if (!selectedRowsID.length) return null;

  return (
    <>
      <Button variant="outline" onClick={handleResetSelection}>
        Reset
        <X />
      </Button>
      <Button
        variant="destructive"
        size="default"
        disabled={isDeleting}
        onClick={() =>
          onDelete({ ids: selectedRowsID }, { onSuccess: handleResetSelection })
        }
      >
        {isDeleting ? <Spinner /> : <Trash />} Delete Selected
      </Button>
    </>
  );
}

export default TableSelectionDelete;
