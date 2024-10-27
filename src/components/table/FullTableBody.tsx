import { useAutoAnimate } from "@formkit/auto-animate/react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Table, flexRender } from "@tanstack/react-table";
import { H3 } from "../typography";
import { Loader2 } from "lucide-react";

interface FullTableBodyProps<TData> {
  table: Table<TData>;
  isLoading?: boolean;
}

const FullTableBody = <T,>({
  table,
  isLoading = false,
}: FullTableBodyProps<T>) => {
  const [animateRef] = useAutoAnimate();
  const columnLen = table.getAllColumns().length;

  return (
    <TableBody ref={animateRef}>
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
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
            ref={animateRef}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
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
