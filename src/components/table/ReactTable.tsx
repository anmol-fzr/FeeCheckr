import { Table } from "@/components/ui/table";
import { FullTableHeader } from "./FullTableHeader";
import { FullTableBody } from "./FullTableBody";
import { FullTableBodyProps } from "./FullTableBody";

type ReactTableProps<TData> = FullTableBodyProps<TData>;

const ReactTable = <T,>({ table, ...props }: ReactTableProps<T>) => {
  return (
    <div className="border rounded-md">
      <Table>
        <FullTableHeader
          table={table}
          className="sticky top-0 !bg-border z-[1] rounded-t-md"
        />
        <FullTableBody table={table} {...props} />
      </Table>
    </div>
  );
};

export { ReactTable };
