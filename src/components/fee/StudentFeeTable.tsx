import * as React from "react";
import { ColumnDef, useReactTable } from "@tanstack/react-table";
import { useInfiniteQuery } from "@tanstack/react-query";
import { API } from "@/service";
import { IResGetFees } from "@/types";
import { batchToClgYear, formatCurrency } from "@/utils";
import {
  getNextPageParam,
  initialPageParam,
  TableActionsMenu,
  TableColCreatedAt,
  TableColumnHeader,
  TableColumnToggler,
  TableColUpdatedAt,
  TableId,
  SearchForm,
} from "@/components";
import {
  useGetTableProps,
  useInfinitePage,
  usePageContext,
  useReactTableVirtualizer,
} from "@/hooks";
import { ReactTable } from "../table/ReactTable";
import { FacetedFilter } from "../table/FacetedFilter";
import { FormInputProps } from "../ui";
import debounce from "lodash.debounce";
import { useForm } from "react-hook-form";
import { formatOrdinals } from "@/lib/utils";
import { FeeStatusBadge } from "@/pages";
import { feeType, semOpts, statuses } from "@/utils/facets";
import { useFilters } from "@/hooks/useFilters";
import { useNavigate } from "react-router-dom";
import { feeStatuses, feeStatusOptions, feeTypes, sems } from "@/utils/options";

type IFee = IResGetFees["data"][0];

const initialFilters = {
  batch: [],
  status: feeStatuses,
  sem: sems,
  feeType: feeTypes,
};

const filterFields = [
  {
    title: "Batch",
    options: statuses,
    name: "batch",
  },
  {
    title: "Fee Status",
    options: feeStatusOptions,
    name: "status",
  },
  {
    title: "Semester",
    options: semOpts,
    name: "sem",
  },
  {
    title: "Fee Type",
    options: feeType,
    name: "feeType",
  },
];

function StudentFeeTable() {
  const tableProps = useGetTableProps();
  const { filters, getFilters, resetFilters } = useFilters(initialFilters);
  const navigate = useNavigate();

  const [filterParams, setFilterParams] = React.useState<
    Record<string, string | string[]>
  >({});

  const tableRef = React.useRef<HTMLDivElement>(null);

  const { handleEdit } = usePageContext();

  const { isLoading, data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      initialPageParam,
      queryKey: ["FEES", filterParams] as const,
      queryFn: ({ pageParam, queryKey }) =>
        API.FEES.GET({ ...pageParam, ...queryKey[1] }),
      getNextPageParam,
    });

  const columns: ColumnDef<IFee>[] = React.useMemo(
    () => [
      {
        accessorKey: "_id",
        header: "Fee Id",
        cell: TableId,
      },
      {
        accessorKey: "sbCollRef",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="SB Collect Ref no." />
        ),
      },
      {
        accessorKey: "student.name",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Student Name" />
        ),
      },
      {
        accessorKey: "sem",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Semester" />
        ),
        cell: ({ cell }) => {
          const sem = cell.row.original.sem;
          return formatOrdinals(sem);
        },
      },
      {
        accessorKey: "feeType",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Fee Type" />
        ),
      },
      {
        accessorKey: "amount",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Amount" />
        ),
        cell: ({ row }) => {
          const amount = row.original.amount;
          const fmtd = formatCurrency(amount);
          return fmtd;
        },
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Status" />
        ),
        cell: ({ cell }) => {
          const status = cell.row.original.status;
          return <FeeStatusBadge status={status} />;
        },
      },
      {
        accessorKey: "batch",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Batch" />
        ),
        cell: ({ row }) => {
          const batch = row.original.student.batch;
          return (
            <p>
              {batch}{" "}
              <span className="text-muted-foreground">
                {batchToClgYear(batch)}
              </span>
            </p>
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
          const onView = () => navigate(_id);
          return <TableActionsMenu {...{ onView, onEdit }} />;
        },
      },
    ],
    [handleEdit, navigate],
  );

  const allRows = React.useMemo(
    () => (data ? data.pages.flatMap((d) => d.data) : []),
    [data],
  );

  const table = useReactTable({
    data: allRows,
    columns,
    meta: {
      onRowDoubleClick: (row: IFee) => navigate(row._id),
    },
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

  const onSearch = React.useCallback(
    debounce(() => {
      const newFilterParams = getFilters();

      setFilterParams({
        //...values,
        ...newFilterParams,
      });
    }, 100),
    [],
  );

  const form = useForm({});

  const onReset = React.useCallback(() => {
    setFilterParams({});
    resetFilters();
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col py-4">
        <SearchForm
          {...form}
          onSearch={onSearch}
          onReset={onReset}
          fields={searchFields}
        />
        <div className="flex items-end gap-4 py-4">
          {filterFields.map(({ title, options, name }) => (
            <FacetedFilter
              key={name}
              title={title}
              options={options}
              selected={filters[name]}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-8 py-4">
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

export { StudentFeeTable };

const searchFields: FormInputProps[] = [
  {
    name: "name",
    label: "Name",
  },
  //{
  //  name: "email",
  //  label: "Email",
  //},
];
