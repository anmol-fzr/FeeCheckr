import {
  TableActionsMenu,
  TableColumnHeader as TableColHeader,
} from "@/components/table";
import { Card, CardContent } from "@/components/ui/card";
import { ReactTable } from "@/components/table/ReactTable";
import { useRouteParam } from "@/hooks";
import { formatOrdinals } from "@/lib/utils";
import { API } from "@/service";
import { IFee } from "@/types";
import { formatCurrency, formatDateTime } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Badge, GoBackButton } from "@/components";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
import { Icon } from "@iconify/react";
import { MobileIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";

type Status = IFee["status"];

const colorXStatus: Record<Status, string> = {
  pending:
    "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 hover:text-yellow-700",
  accepted:
    "bg-green-100 text-green-700 hover:bg-green-100 hover:text-green-700",
  rejected: "bg-red-100 text-red-700 hover:bg-red-100 hover:text-red-700",
};

const year = new Date().getFullYear();

const StudentOnlyPage = () => {
  let studentId = useRouteParam("studentId");

  const navigate = useNavigate();

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
        const status: Status = row.getValue("status");
        return <FeeStatusBadge status={status} />;
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <TableColHeader column={column} title="Submitted" />
      ),
      cell: ({ row }) => {
        const date = row.getValue("createdAt");
        const formatted = formatDateTime(date);
        return <div className="font-medium">{formatted}</div>;
      },
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

  return (
    <>
      <GoBackButton />

      {!isLoading && (
        <Card className="w-full">
          <CardContent className="flex p-6 flex-col gap-12">
            <div className="grid gap-4 ">
              <div className="flex flex-col gap-2">
                <h3 className="text-3xl font-bold leading-none">
                  {data?.data?.profile?.name}
                </h3>
                <p className="text-muted-foreground">
                  {data?.data?.profile.batch}
                  {" ( "}
                  {formatOrdinals(year - data?.data?.profile.batch + 1)} Year
                  {" ) "}
                </p>
                <p className="text-muted-foreground">
                  {data?.data?.profile.rollNo}
                </p>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center space-x-3">
                  <Icon icon="solar:phone-line-duotone" fontSize={24} />
                  <p className="text-sm text-gray-500 font-medium">
                    {data?.data?.profile?.mobile.toString()}
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
            <ReactTable table={table} />
          </CardContent>
        </Card>
      )}
    </>
  );
};

const FeeStatusBadge = memo(({ status }: { status: Status }) => {
  return <Badge className={colorXStatus[status]}>{status.toUpperCase()}</Badge>;
});

export { StudentOnlyPage, FeeStatusBadge };
