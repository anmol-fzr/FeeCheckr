import { Table } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

interface UseReactTableVirtualizer<TData> {
  table: Table<TData>;
  tableRef: React.RefObject<HTMLDivElement>;
}

const useReactTableVirtualizer = <TData>({
  table,
  tableRef,
}: UseReactTableVirtualizer<TData>) => {
  return useVirtualizer({
    count: table.getRowModel().rows.length,
    estimateSize: () => 72,
    getScrollElement: () => tableRef.current,
    overscan: 10,
  });
};

export { useReactTableVirtualizer };
