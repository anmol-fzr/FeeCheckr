import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Row, Table, flexRender } from "@tanstack/react-table";
import { H3 } from "../typography";
import { Loader2 } from "lucide-react";
import { Virtualizer } from "@tanstack/react-virtual";

interface FullTableBodyProps<TData> {
  table: Table<TData>;
  isLoading: boolean;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
}

const FullTableBody = <T,>({
  table,
  isLoading = false,
  rowVirtualizer,
}: FullTableBodyProps<T>) => {
  const columnLen = table.getAllColumns().length;

  const { rows } = table.getRowModel();

  return (
    <TableBody
      style={{
        width: "100%",
        position: "relative",
      }}
    >
      {isLoading ? (
        <>
          <TableRow>
            <TableCell colSpan={columnLen} className="h-48  text-center">
              <Loader2 className="h-12 w-12 animate-spin mx-auto" />
              <H3>Loading ...</H3>
            </TableCell>
          </TableRow>
        </>
      ) : table.getRowModel().rows?.length ? (
        rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const row = rows[virtualRow.index] as Row<T>;
          return (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              style={{
                height: "72px",
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          );
        })
      ) : (
        <TableRow>
          <TableCell colSpan={columnLen} className="h-48 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export { FullTableBody };
export type { FullTableBodyProps };
