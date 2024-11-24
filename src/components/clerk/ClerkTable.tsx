import * as React from "react";
import { ColumnDef, useReactTable } from "@tanstack/react-table";
import { useInfiniteQuery } from "@tanstack/react-query";
import { API } from "@/service";
import { IAdminCreatedBy, IClerk } from "@/types";
import { Tipper } from "@/components";
import {
  getNextPageParam,
  TableActionsMenu,
  TableColCreatedAt,
  TableColumnHeader,
  TableColumnToggler,
  TableColUpdatedAt,
  TableId,
} from "@/components/table";
import {
  useGetTableProps,
  usePageContext,
  useReactTableVirtualizer,
} from "@/hooks";
import { ReactTable } from "../table/ReactTable";

function ClerkTable() {
  const tableProps = useGetTableProps();

  const tableRef = React.useRef<HTMLDivElement>(null);

  const { handleEdit, handleDelete } = usePageContext();

  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      initialPageParam: {
        page: 1,
        size: 10,
      },
      queryKey: ["CLERK"],
      queryFn: ({ pageParam }) => API.CLERK.GET(pageParam),
      getNextPageParam,
    });

  const flatData = React.useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data],
  );

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
        cell: TableColCreatedAt,
      },
      {
        accessorKey: "updatedAt",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Updated At" />
        ),
        cell: TableColUpdatedAt,
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
    data: [],
    columns,
    ...tableProps,
  });

  const rowVirtualizer = useReactTableVirtualizer({
    table,
    tableRef,
  });

  React.useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= flatData.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    flatData.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <TableColumnToggler table={table} />
      </div>
      <div
        ref={tableRef}
        style={{
          height: `790px`,
          width: `100%`,
          overflow: "auto",
        }}
      >
        <ReactTable
          table={table}
          isLoading={isLoading}
          rowVirtualizer={rowVirtualizer}
        />
      </div>
    </div>
  );
}

export { ClerkTable };
