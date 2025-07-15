import {
	TableActionsMenu,
	TableColCreatedAt,
	TableColumnHeader as TableColHeader,
} from "@/components/table";
import { FeeStatusBadge } from "@/components";
import { Card, CardContent } from "@/components/ui/card";
import { ReactTable } from "@/components/table/ReactTable";
import { useReactTableVirtualizer, useRouteParam } from "@/hooks";
import { formatOrdinals } from "@/lib/utils";
import { API } from "@/service";
import { IFee } from "@/types";
import { batchToClgYear, formatCurrency } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import {
	ColumnDef,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { GoBackButton } from "@/components";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useRef } from "react";

const StudentOnlyPage = () => {
	const studentId = useRouteParam("studentId");

	const navigate = useNavigate();
	const tableRef = useRef<HTMLDivElement>(null);

	const { isLoading, data } = useQuery({
		queryKey: ["STUDENTS", studentId] as const,
		queryFn: ({ queryKey }) => API.STUDENTS.ONE(queryKey[1]),
	});

	const columns: ColumnDef<IFee>[] = [
		{
			accessorKey: "sem",
			header: ({ column }) => (
				<TableColHeader column={column} title="Semester" />
			),
			cell: ({ row }) => <p>{formatOrdinals(row.getValue("sem"))}</p>,
		},
		{
			accessorKey: "sbCollRef",
			header: ({ column }) => (
				<TableColHeader column={column} title="SB Collect Ref Number" />
			),
		},
		{
			accessorKey: "amount",
			header: ({ column }) => <TableColHeader column={column} title="Amount" />,
			cell: ({ row }) => <p>{formatCurrency(row.getValue("amount"))}</p>,
		},
		{
			accessorKey: "feeType",
			header: ({ column }) => (
				<TableColHeader column={column} title="Fee Type" />
			),
		},
		{
			accessorKey: "status",
			header: ({ column }) => <TableColHeader column={column} title="Status" />,
			cell: ({ row }) => {
				const status = row.original.status;
				return <FeeStatusBadge status={status} />;
			},
		},
		{
			accessorKey: "createdAt",
			header: ({ column }) => (
				<TableColHeader column={column} title="Submitted" />
			),
			cell: TableColCreatedAt,
		},
		{
			accessorKey: "_id",
			header: ({ column }) => (
				<TableColHeader column={column} title="Actions" />
			),
			cell: ({ row }) => {
				const feeId = row.getValue("_id");
				const onView = () => navigate(`/fees/${feeId}`);

				return <TableActionsMenu onView={onView} />;
			},
		},
	];

	const table = useReactTable({
		data: isLoading ? [] : data?.data?.fees,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const rowVirtualizer = useReactTableVirtualizer({
		table,
		tableRef,
	});

	return (
		<>
			<GoBackButton />

			{!isLoading && (
				<Card className="w-full">
					<CardContent className="flex p-6 flex-col gap-12">
						<div className="grid gap-4 ">
							<div className="flex flex-col gap-2">
								<h3 className="text-3xl font-bold leading-none">
									{data?.data?.name}
								</h3>
								<p className="text-muted-foreground">
									{data?.data?.batch}
									{/*
                  {batchToClgYear(data?.data?.batch)}
                    */}
								</p>
								<p className="text-muted-foreground">{data?.data?.rollNo}</p>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center space-x-3">
									<Icon icon="solar:phone-line-duotone" fontSize={24} />
									<p className="text-sm text-gray-500 font-medium">
										{data?.data?.mobile.toString()}
									</p>
								</div>
								<div className="flex items-center space-x-3">
									<Icon icon="solar:mailbox-line-duotone" fontSize={24} />
									<p className="text-sm text-gray-500 font-medium">
										{data?.data?.email.toString()}
									</p>
								</div>
							</div>
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
					</CardContent>
				</Card>
			)}
		</>
	);
};

export { StudentOnlyPage, FeeStatusBadge };
