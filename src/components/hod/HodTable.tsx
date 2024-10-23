import { useState, useMemo } from "react";
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
import { useDebounce } from "@uidotdev/usehooks";
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
import { IAdminCreatedBy, IDept } from "@/types";
import { formatDateTime } from "@/utils";
import { FormSelect, Tipper } from "@/components";
import {
  TableActionsMenu,
  TableColumnHeader,
  TableColumnToggler,
  TableId,
} from "@/components/table";
import { usePageContext } from "@/hooks";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useMetaStore } from "@/store";

function HodTable() {
  const deptOpts = useMetaStore((state) => state.depts);
  const [filters, setFilters] = useState({ deptId: undefined });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState<any>([]);

  const form = useForm({
    defaultValues: {
      deptId: "",
    },
  });

  //const deptId = useWatch({
  //  control: form.control,
  //  name: "deptId",
  //});

  const { isLoading, data } = useQuery({
    queryKey: ["ADMIN", filters] as const,
    queryFn: ({ queryKey }) => API.ADMIN.GET(queryKey[1]),
  });

  const { handleEdit, handleDelete } = usePageContext();

  const columns: ColumnDef<IDept>[] = useMemo(
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
    [],
  );

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
    onGlobalFilterChange: setGlobalFilter,
    state: {
      globalFilter,
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  console.log(columnFilters);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center py-4">
        <div className="w-full max-w-sm">
          <FormProvider {...form}>
            <form className="flex w-full gap-4 items-end">
              <FormSelect
                name="deptId"
                options={deptOpts}
                label="Search Department"
              />
              <input
                value=""
                onChange={(e) => table.setGlobalFilter(String(e.target.value))}
                placeholder="Search..."
              />
            </form>
          </FormProvider>
        </div>

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

export { HodTable };
