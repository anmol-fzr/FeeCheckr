import { useMemo, useRef } from "react";
import { ColumnDef, useReactTable } from "@tanstack/react-table";
import { useInfiniteQuery } from "@tanstack/react-query";
import { API } from "@/service";
import { IAdminCreatedBy, IAdmin } from "@/types";
import { Tipper } from "@/components";
import {
	TableActionsMenu,
	TableColCreatedAt,
	TableColumnHeader,
	TableColumnToggler,
	TableColUpdatedAt,
	TableId,
} from "@/components/table";
import {
	useGetTableProps,
	useInfinitePage,
	usePageContext,
	useReactTableVirtualizer,
} from "@/hooks";
import { ReactTable } from "../table/ReactTable";
import { initialPageParam, getNextPageParam } from "@/components/table";

function HodTable() {
	const tableProps = useGetTableProps();

	const tableRef = useRef<HTMLDivElement>(null);

	const { isLoading, data, fetchNextPage, isFetchingNextPage, hasNextPage } =
		useInfiniteQuery({
			initialPageParam,
			queryKey: ["ADMIN"],
			queryFn: ({ pageParam }) => API.ADMIN.GET(pageParam),
			getNextPageParam,
		});

	const { handleEdit, handleDelete } = usePageContext();

	const columns: ColumnDef<IAdmin>[] = useMemo(
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
		[],
	);

	const allRows = useMemo(
		() => (data ? data.pages.flatMap((d) => d.data) : []),
		[data],
	);

	const table = useReactTable({
		data: allRows,
		columns,
		...tableProps,
	});

	const rowVirtualizer = useReactTableVirtualizer({
		table,
		tableRef,
	});

	useInfinitePage({
		rowVirtualizer,
		allRows,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	});

	return (
		<div className="flex flex-col gap-4 w-full">
			<TableColumnToggler table={table} />
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

export { HodTable };
