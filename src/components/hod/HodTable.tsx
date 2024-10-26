import { useMemo } from "react";
import { ColumnDef, useReactTable } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/service";
import { IAdminCreatedBy, IDept } from "@/types";
import { formatDateTime } from "@/utils";
import { Tipper } from "@/components";
import {
  TableActionsMenu,
  TableColumnHeader,
  TableColumnToggler,
  TableId,
} from "@/components/table";
import { useGetTableProps, usePageContext } from "@/hooks";
import { TablePagination } from "../table/TablePagingation";
import { ReactTable } from "../table/ReactTable";

function HodTable() {
  const tableProps = useGetTableProps();

  const { isLoading, data } = useQuery({
    queryKey: ["ADMIN"] as const,
    queryFn: API.ADMIN.GET,
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
      //{
      //  accessorKey: "dept.name",
      //  header: ({ column }) => (
      //    <TableColumnHeader column={column} title="Department" />
      //  ),
      //},
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
    ...tableProps,
  });

  return (
    <div className="flex flex-col gap-4 w-full">
      <TableColumnToggler table={table} />
      <div className="rounded-md border">
        <ReactTable table={table} />
      </div>
      <TablePagination table={table} />
    </div>
  );
}

export { HodTable };
