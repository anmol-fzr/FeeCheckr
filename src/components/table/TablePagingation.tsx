import { Button } from "@/components";
import type { Table as TableType } from "@tanstack/react-table";

interface TablePaginationProps<TData> {
  table: TableType<TData>;
}

const TablePagination = <T,>({ table }: TablePaginationProps<T>) => {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export { TablePagination };
