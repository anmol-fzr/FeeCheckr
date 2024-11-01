import { useCallback, useMemo, useRef } from "react";
import { ColumnDef, useReactTable } from "@tanstack/react-table";
import { useInfiniteQuery } from "@tanstack/react-query";
import { API } from "@/service";
import { IStudent } from "@/types";
import {
  TableColumnHeader,
  TableColumnToggler,
  TableId,
  ReactTable,
  TableColCreatedAt,
  TableColUpdatedAt,
  FormInputProps,
  SearchForm,
  TableColNA,
  Button,
} from "@/components";
import { EyeIcon } from "lucide-react";
import {
  useGetTableProps,
  useInfinitePage,
  useReactTableVirtualizer,
} from "@/hooks";
import debounce from "lodash.debounce";
import { useForm } from "react-hook-form";
import { FacetedFilter } from "../table/FacetedFilter";
import { useSet } from "@uidotdev/usehooks";
import {
  batchFacets,
  profileCompletedOpts,
  profileVerifiedOpts,
} from "@/utils/facets";
import { initialPageParam, getNextPageParam } from "@/components";
import { useFilterParams } from "@/hooks/query/useFilterParams";
import { useNavigate } from "react-router-dom";
import { batchToClgYear } from "@/utils";
import { useFilters } from "@/hooks/useFilters";

const searchFields: FormInputProps[] = [
  {
    name: "name",
    label: "Name",
  },
  {
    name: "email",
    label: "Email",
  },
];

const initialFilters = {
  batch: [],
  verified: [true, false],
  profileCompleted: [true, false],
} as const;

const filterFields = [
  {
    title: "Batch",
    options: batchFacets,
    name: "batch",
    hideSearch: false,
  },
  {
    title: "Verified",
    options: profileVerifiedOpts,
    name: "verified",
    hideSearch: true,
  },
  {
    title: "Profile Completed",
    options: profileCompletedOpts,
    name: "profileCompleted",
    hideSearch: true,
  },
] as const;

function StudentTable() {
  const tableProps = useGetTableProps();
  const selectedBatchs = useSet<string>();
  const { filterParams, appendFilterParams, resetFilterParams } =
    useFilterParams({});

  const { filters, resetFilters } = useFilters(initialFilters);

  const tableRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const columns: ColumnDef<IStudent>[] = useMemo(
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
        cell: ({ row }) => {
          const name = row.original.name;
          return name ?? <TableColNA />;
        },
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
        cell: ({ row }) => {
          return row.original.mobile ?? <TableColNA />;
        },
      },
      {
        accessorKey: "batch",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Batch" />
        ),
        cell: ({ row }) => {
          const batch = row.original.batch;
          return batch ? (
            <p>
              {batch}{" "}
              <span className="text-muted-foreground">
                {batchToClgYear(batch)}
              </span>
            </p>
          ) : (
            <span className="text-muted-foreground">N/A</span>
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
        id: "view",
        header: "View",
        cell: ({ row }) => {
          const _id = row.original._id;
          const onView = () => navigate(_id);
          return (
            <Button variant="ghost" onClick={onView} size="sm">
              <EyeIcon />
              View
            </Button>
          );
        },
      },
    ],
    [navigate],
  );

  const { isLoading, data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      initialPageParam,
      queryKey: ["STUDENTS", filterParams] as const,
      queryFn: ({ pageParam, queryKey }) =>
        API.STUDENTS.GET({ ...pageParam, ...queryKey[1] }),
      getNextPageParam,
    });

  const allRows = useMemo(
    () => (data ? data.pages.flatMap((d) => d.data) : []),
    [data],
  );

  const table = useReactTable({
    data: allRows,
    columns,
    meta: {
      onRowDoubleClick: (row) => navigate(row._id),
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

  const form = useForm();

  const onSearch = useCallback(
    debounce(() => {
      const values = form.getValues();
      const batch = Array.from(filters.batch);
      const completion = Array.from(filters.profileCompleted);
      const isVerified = Array.from(filters.verified);
      appendFilterParams({
        ...values,
        batch,
        completion,
        isVerified,
      });
    }, 250),
    [selectedBatchs],
  );

  const onReset = useCallback(() => {
    resetFilterParams();
    form.reset();
    resetFilters();
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full ">
      <div className="flex flex-col gap-4 py-6">
        <SearchForm
          {...form}
          onSearch={onSearch}
          onReset={onReset}
          fields={searchFields}
        />
        <div className="flex items-end gap-4">
          {filterFields.map(({ title, options, name, hideSearch }) => (
            <FacetedFilter
              key={name}
              {...{ hideSearch, title, options }}
              selected={filters[name]}
            />
          ))}
        </div>
      </div>
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

export { StudentTable };
