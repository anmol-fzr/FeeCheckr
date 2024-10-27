import * as React from "react";
import { ColumnDef, useReactTable } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/service";
import { IStudent } from "@/types";
import { formatDateTime } from "@/utils";
import {
  TableActionsMenu,
  TableColumnHeader,
  TableColumnToggler,
  TableId,
} from "@/components/table";
import { useGetTableProps, usePageContext, useTableContext } from "@/hooks";
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
import { FormInput, StatusBadge } from "@/components";
import { useNavigate } from "react-router-dom";

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

const boolOps = [
  {
    label: "Verified",
    value: "true",
  },
  {
    label: "Un Verified",
    value: "false",
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

function StudentTable() {
  const tableProps = useGetTableProps();
  const selectedBatchs = useSet<string>();
  const selectedCompletions = useSet<string>(["complete", "uncomplete"]);
  const selectedVerification = useSet<string>(["true", "false"]);

  const navigate = useNavigate();
  const { page } = useTableContext();

  const [filterParams, setFilterParams] = React.useState<
    Record<string, string | string[]>
  >({});

  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const params = React.useMemo(
    () => ({ ...filterParams, page }),
    [filterParams, page],
  );

  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["STUDENTS", params] as const,
    queryFn: ({ queryKey }) => API.STUDENTS.GET(queryKey[1]),
  });

  const columns: ColumnDef<IStudent>[] = React.useMemo(
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
          //const onEdit = () => handleEdit(_id);
          //const onDelete = () => handleDelete(_id);
          const onView = () => navigate(_id);
          return <TableActionsMenu {...{ onView }} />;
        },
      },
    ],
    [navigate],
  );

  const table = useReactTable<IStudent>({
    data: isLoading ? [] : data?.data,
    columns,
    ...tableProps,
  });

  //const haveFiltersOn =

  const onSearch = React.useCallback(
    debounce(() => {
      const values = form.getValues();
      const batch = Array.from(selectedBatchs);
      const completion = Array.from(selectedCompletions);
      const isVerified = Array.from(selectedVerification);
      setFilterParams({
        ...values,
        batch,
        completion,
        isVerified,
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
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-4 py-6">
        <H3>Search</H3>
        {page}
        <div className="flex items-end gap-4">
          <FormProvider {...form}>
            <form className="flex gap-4 items-end">
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
        className="rounded-md border "
        //onScroll={(e) => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
        ref={tableContainerRef}
      >
        <ReactTable table={table} isLoading={isFetching} />
      </div>
    </div>
  );
}

export { StudentTable };
