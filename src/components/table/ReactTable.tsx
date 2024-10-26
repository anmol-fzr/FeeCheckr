import { Table } from "@/components/ui/table";
import type { Table as TableType } from "@tanstack/react-table";
import { FullTableHeader } from "./FullTableHeader";
import { FullTableBody } from "./FullTableBody";

interface ReactTableProps<TData> {
  table: TableType<TData>;
}

const ReactTable = <T,>({ table }: ReactTableProps<T>) => {
  return (
    <div className="border rounded-md">
      <Table>
        <FullTableHeader table={table} />
        <FullTableBody table={table} />
      </Table>
    </div>
  );
};

export { ReactTable };
