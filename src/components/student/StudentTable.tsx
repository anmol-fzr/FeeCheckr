import { useCallback, useMemo, useRef } from "react";
import { ColumnDef, useReactTable } from "@tanstack/react-table";
import { useInfiniteQuery } from "@tanstack/react-query";
import { API } from "@/service";
import { IStudent } from "@/types";
import {
  TableActionsMenu,
  TableColumnHeader,
  TableColumnToggler,
  TableId,
  StatusBadge,
  FormInput,
  ReactTable,
  TableColCreatedAt,
  TableColUpdatedAt,
  FormInputProps,
  SearchButton,
  CrossButton,
} from "@/components";
import {
  useGetTableProps,
  useInfinitePage,
  useReactTableVirtualizer,
} from "@/hooks";
import { H3 } from "../typography";
import debounce from "lodash.debounce";
import { FormProvider, useForm } from "react-hook-form";
import { FacetedFilter } from "../table/FacetedFilter";
import { useSet } from "@uidotdev/usehooks";
import { proComp, boolOps, statuses } from "@/utils/facets";
import { initialPageParam, getNextPageParam } from "@/components";
import { useFilterParams } from "@/hooks/query/useFilterParams";
import { useNavigate } from "react-router-dom";

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

function StudentTable() {
  const tableProps = useGetTableProps();
  const selectedBatchs = useSet<string>();
  const selectedCompletions = useSet<string>(["complete", "uncomplete"]);
  const selectedVerification = useSet<string>(["true", "false"]);
  const { filterParams, appendFilterParams, resetFilterParams } =
    useFilterParams({});

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
        cell: ({ cell }) => {
          const name = cell.row.original?.name;
          return name ?? "N/A";
        },
      },
      {
        accessorKey: "isVerified",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Verified" />
        ),
        cell: ({ cell }) => {
          const isVerified = cell.row.original.isVerified;
          return (
            <StatusBadge variant={isVerified ? "green" : "red"}>
              {isVerified ? "Verified" : "Un Verified"}
            </StatusBadge>
          );
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
        cell: ({ cell }) => {
          return cell.row.original?.details?.mobile ?? "N/A";
        },
      },
      {
        accessorKey: "batch",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Batch" />
        ),
        cell: ({ cell }) => {
          return cell.row.original?.batch ?? "N/A";
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
          const onView = () => navigate(_id);
          return <TableActionsMenu {...{ onView }} />;
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
      const batch = Array.from(selectedBatchs);
      const completion = Array.from(selectedCompletions);
      const isVerified = Array.from(selectedVerification);
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
    selectedBatchs.clear();
    selectedCompletions.add("complete");
    selectedCompletions.add("uncomplete");
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full ">
      <div className="flex flex-col gap-4 py-6">
        <H3>Search</H3>
        <div className="flex items-end gap-4">
          <FormProvider {...form}>
            <form className="flex gap-4 items-end">
              {searchFields.map((props) => (
                <FormInput
                  key={props.name}
                  {...props}
                  className="min-w-[250px]"
                />
              ))}

              <SearchButton onClick={onSearch} />
              <CrossButton onClick={onReset} />
            </form>
          </FormProvider>
        </div>
        <div className="flex items-end gap-4">
          <FacetedFilter
            title="Batch"
            options={statuses}
            {...{ selected: selectedBatchs }}
          />
          <FacetedFilter
            hideSearch
            title="Verified"
            options={boolOps}
            {...{ selected: selectedVerification }}
          />
          <FacetedFilter
            hideSearch
            title="Profile Completed"
            options={proComp}
            {...{ selected: selectedCompletions }}
          />
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
