import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useInfiniteQuery } from "@tanstack/react-query";
import { API } from "@/service";
import { IAdminCreatedBy, IClerk } from "@/types";
import { formatDateTime } from "@/utils";
import { Tipper } from "@/components";
import {
  TableActionsMenu,
  TableColumnHeader,
  TableColumnToggler,
  TableId,
} from "@/components/table";
import { usePageContext } from "@/hooks";

function ClerkTable() {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const { handleEdit, handleDelete } = usePageContext();

  const { isLoading, data, fetchNextPage, isFetching } = useInfiniteQuery({
    initialPageParam: {
      page: 1,
      size: 10,
    },
    queryKey: ["CLERK"],
    queryFn: ({ pageParam }) => API.CLERK.GET(pageParam),
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const hasNextPage = lastPage.totalPages > lastPageParam.page;
      return hasNextPage
        ? {
            page: lastPage.currPage + 1,
            size: lastPage.currPageSize,
          }
        : null;
    },
  });

  const flatData = React.useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data],
  );

  const totalDBRowCount = data?.pages?.[0]?.totalPages ?? 0;
  console.log(data?.pages[0]);

  const totalFetched = flatData.length;

  console.log({
    totalFetched,
    totalDBRowCount,
  });

  const fetchMoreOnBottomReached = React.useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        //once the user has scrolled within 500px of the bottom of the table, fetch more data if we can
        if (
          scrollHeight - scrollTop - clientHeight < 500 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount],
  );

  //a check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  React.useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  const columns: ColumnDef<IClerk>[] = React.useMemo(
    () => [
      {
        accessorKey: "_id",
        header: "Id",
        cell: TableId,
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Name" />
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Email Address" />
        ),
      },
      {
        accessorKey: "mobile",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Mobile Number" />
        ),
      },
      {
        accessorKey: "createdBy",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Created By" />
        ),
        cell: ({ row }) => {
          const createdBy: IAdminCreatedBy = row.getValue("createdBy");
          const name = createdBy.name;
          const isMe = createdBy.isCreatedByMe;
          return (
            <div className="font-medium">
              <Tipper
                tooltip={`This Department is created By ${isMe ? "You" : name}`}
              >
                {isMe ? (
                  <p>
                    You{" "}
                    <span className="text-muted-foreground">( {name} )</span>
                  </p>
                ) : (
                  name
                )}
              </Tipper>
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Created At" />
        ),
        cell: ({ row }) => {
          const date = row.getValue("createdAt");
          const formatted = formatDateTime(date);
          return <div className="font-medium">{formatted}</div>;
        },
      },
      {
        accessorKey: "updatedAt",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Updated At" />
        ),
        cell: ({ row }) => {
          const updatedAt = row.getValue("updatedAt");
          const createdAt = row.getValue("createdAt");
          return (
            <div className="font-medium">
              {createdAt === updatedAt
                ? "Never Updated"
                : formatDateTime(updatedAt)}
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const _id = row.getValue("_id");
          const onEdit = () => handleEdit(_id);
          const onDelete = () => handleDelete(_id);
          return <TableActionsMenu {...{ onEdit, onDelete }} />;
        },
      },
    ],
    [handleEdit, handleDelete],
  );

  const table = useReactTable({
    data: isLoading ? [] : flatData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <TableColumnToggler table={table} />
      </div>
      <button onClick={() => fetchNextPage()}>fetchNextPage</button>
      <div
        className="rounded-md border"
        onScroll={(e) => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
        ref={tableContainerRef}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/*
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
        */}
    </div>
  );
}

export { ClerkTable };
