import { useAutoAnimate } from "@formkit/auto-animate/react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Table, flexRender } from "@tanstack/react-table";

interface FullTableBodyProps<TData> {
  table: Table<TData>;
}

const FullTableBody = <T,>({ table }: FullTableBodyProps<T>) => {
  const [animateRef] = useAutoAnimate();
  const columnLen = table.getAllColumns().length;

  return (
    <TableBody ref={animateRef}>
      {table.getRowModel().rows?.length ? (
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
          <TableCell colSpan={columnLen} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export { FullTableBody };
