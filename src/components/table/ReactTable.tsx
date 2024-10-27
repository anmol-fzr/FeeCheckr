import { Table } from "@/components/ui/table";
import type { Table as TableType } from "@tanstack/react-table";
import { FullTableHeader } from "./FullTableHeader";
import { FullTableBody } from "./FullTableBody";
import { TablePagination } from "./TablePagingation";

interface ReactTableProps<TData> {
  table: TableType<TData>;
  isLoading?: boolean;
}

const ReactTable = <T,>({ table, isLoading }: ReactTableProps<T>) => {
  return (
    <div className="border rounded-md">
      <Table>
        <FullTableHeader table={table} />
        <FullTableBody table={table} isLoading={isLoading} />
        <TablePagination />
      </Table>
    </div>
  );
};

export { ReactTable };
