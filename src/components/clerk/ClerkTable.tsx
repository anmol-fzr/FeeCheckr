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

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
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

const columns: ColumnDef<IClerk>[] = [
  //{
  //  id: "select",
  //  header: ({ table }) => (
  //    <Checkbox
  //      checked={
  //        table.getIsAllPageRowsSelected() ||
  //        (table.getIsSomePageRowsSelected() && "indeterminate")
  //      }
  //      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //      aria-label="Select all"
  //    />
  //  ),
  //  cell: ({ row }) => (
  //    <Checkbox
  //      checked={row.getIsSelected()}
  //      onCheckedChange={(value) => row.toggleSelected(!!value)}
  //      aria-label="Select row"
  //    />
  //  ),
  //  enableSorting: false,
  //  enableHiding: false,
  //},
  {
    accessorKey: "_id",
    header: "Id",
    cell: TableId,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <TableColumnHeader column={column} title="Name" />,
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
    accessorKey: "dept.name",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Department" />
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
                You <span className="text-muted-foreground">( {name} )</span>
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
    cell: () => {
      const onEdit = () => console.log("onEdit");
      const onDelete = () => console.log("onDelete");
      return <TableActionsMenu {...{ onEdit, onDelete }} />;
    },
  },
];

function ClerkTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const { isLoading, data } = useQuery({
    queryKey: ["CLERK"],
    queryFn: API.CLERK.GET,
  });

  const table = useReactTable({
    data: isLoading ? [] : data.data,
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
      <div className="rounded-md border">
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
    </div>
  );
}

export { ClerkTable };
