import { useMemo, useRef } from "react";
import { ColumnDef, useReactTable } from "@tanstack/react-table";
import { useInfiniteQuery } from "@tanstack/react-query";
import { API } from "@/service";
import { IAdmin, IAdminCreatedBy, IClerk } from "@/types";
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

function ClerkTable() {
	const tableProps = useGetTableProps();

	const tableRef = useRef<HTMLDivElement>(null);

	const { handleEdit, handleDelete } = usePageContext();

	const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			initialPageParam: {
				size: 10,
				page: 1,
			},
			queryKey: ["CLERK"],
			queryFn: ({ pageParam }) => API.CLERK.GET(pageParam),
			getNextPageParam,
		});

	const allRows = useMemo(
		() => data?.pages?.flatMap((page) => page.data) ?? [],
		[data],
	);

	const columns: ColumnDef<IClerk>[] = useMemo(
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
								tooltip={`This Clerk is created By ${isMe ? "You" : name}`}
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
					const _id = row.original._id;

					const onEdit = () => handleEdit(_id);
					const onDelete = () => handleDelete(_id);
					return <TableActionsMenu {...{ onEdit, onDelete }} />;
				},
			},
		],
		[handleEdit, handleDelete],
	);

	const table = useReactTable({
		data: allRows,
		columns: columns as ColumnDef<IAdmin>[],
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
