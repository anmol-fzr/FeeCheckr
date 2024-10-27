import * as React from "react";
import { ColumnDef, useReactTable } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/service";
import { IStudent, IResGetFees } from "@/types";
import { batchToClgYear, formatCurrency, formatDateTime } from "@/utils";
import {
  TableActionsMenu,
  TableColumnHeader,
  TableColumnToggler,
  TableId,
} from "@/components/table";
import { useGetTableProps, usePageContext } from "@/hooks";
import { ReactTable } from "../table/ReactTable";
import { FacetedFilter } from "../table/FacetedFilter";
import { Button } from "../ui";
import {
  MagnifyingGlassIcon as SearchIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import debounce from "lodash.debounce";
import { useSet } from "@uidotdev/usehooks";
import { H3 } from "../typography";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "@/components";
import { formatOrdinals } from "@/lib/utils";
import { FeeStatusBadge } from "@/pages";

const proComp = [
  {
    label: "Complete",
    value: "complete",
  },
  {
    label: "UnComplete",
    value: "uncomplete",
  },
];

const statuses = [
  {
    value: "2021",
    label: "2021",
  },
  {
    value: "2022",
    label: "2022",
  },
  {
    value: "2024",
    label: "2024",
  },
];

type IFee = IResGetFees["data"][0];

function StudentFeeTable() {
  const tableProps = useGetTableProps();
  const selectedBatchs = useSet<string>();
  const selectedCompletions = useSet<string>(["complete", "uncomplete"]);

  const [filterParams, setFilterParams] = React.useState<
    Record<string, string | string[]>
  >({});

  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const { handleEdit, handleDelete } = usePageContext();

  const { isLoading, data } = useQuery({
    queryKey: ["FEES"] as const,
    queryFn: () => API.FEES.GET(),
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
          <TableColumnHeader column={column} title="SB Collect Ref" />
        ),
      },
      {
        accessorKey: "student.details.name",
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
          const amount = row.getValue("amount");
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
          return (
            <>
              <FeeStatusBadge status={status} />
              {/*
              <Button variant="ghost">ghost</Button>
                */}
            </>
          );
        },
      },
      {
        accessorKey: "student.details.batch",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Batch" />
        ),
        cell: ({ cell }) => {
          const batch = cell.row.original.student.details.batch;
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
    [handleEdit, handleDelete],
  );

  const table = useReactTable<IStudent>({
    data: isLoading ? [] : data?.data,
    columns,
    ...tableProps,
  });

  //const haveFiltersOn =

  const onSearch = React.useCallback(
    debounce((values?: any) => {
      const batch = Array.from(selectedBatchs);
      const completion = Array.from(selectedCompletions);
      setFilterParams({
        ...values,
        batch,
        completion,
      });
    }, 250),
    [selectedBatchs],
  );

  const form = useForm({});

  const onReset = React.useCallback(() => {
    setFilterParams({});
    selectedBatchs.clear();
    selectedCompletions.add("complete");
    selectedCompletions.add("uncomplete");
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col py-4">
        <H3>Search</H3>
        <div className="flex items-end gap-4 py-4">
          <FormProvider {...form}>
            <form
              className="flex gap-4 items-end"
              onSubmit={form.handleSubmit(onSearch)}
            >
              <FormInput name="name" label="Name" className="min-w-[250px]" />
              <FormInput
                name="email"
                label="Email"
                type="text"
                className="min-w-[250px]"
              />

              <Button variant="outline" onClick={onSearch}>
                <SearchIcon />
                Search
              </Button>
              <Button variant="ghost" onClick={onReset}>
                Reset
                <Cross2Icon />
              </Button>
            </form>
          </FormProvider>
        </div>
        <div className="flex items-end gap-4 py-4">
          <FacetedFilter
            title="Batch"
            options={statuses}
            {...{ selected: selectedBatchs }}
          />
          <FacetedFilter
            hideSearch
            title="Profile Completed"
            options={proComp}
            {...{ selected: selectedCompletions }}
          />
        </div>
      </div>
      <div className="flex items-center gap-8 py-4">
        <TableColumnToggler table={table} />
      </div>
      <div
        className="rounded-md border"
        //onScroll={(e) => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
        ref={tableContainerRef}
      >
        <ReactTable table={table} />
      </div>
    </div>
  );
}

export { StudentFeeTable };
