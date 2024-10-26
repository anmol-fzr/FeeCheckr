import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Table, flexRender } from "@tanstack/react-table";

interface FullTableHeaderProps<TData> {
  table: Table<TData>;
}

const FullTableHeader = <T,>({ table }: FullTableHeaderProps<T>) => {
  const [animateRef] = useAutoAnimate();

  return (
    <TableHeader ref={animateRef}>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} ref={animateRef}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};

export { FullTableHeader };
