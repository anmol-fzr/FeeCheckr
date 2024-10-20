import { useSideBarRole } from "@/hooks/useSideBarRole";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/service";
import {
  DataTable,
  DataTableColumn,
  useDataTableColumns,
} from "mantine-datatable";
import { IAdmin } from "@/types";
import { formatDateTime } from "@/utils";

const Clerk = () => {
  useSideBarRole();

  const { isLoading, data } = useQuery({
    queryKey: ["CLERK"],
    queryFn: API.CLERK.GET,
  });

  console.log({ data });

  const { effectiveColumns } = useDataTableColumns<IAdmin>({
    key: "key",
    columns: [
      { accessor: "_id", title: "Id", resizable: true },
      { accessor: "name", title: "Name", sortable: true, resizable: true },
      { accessor: "email", resizable: true },
      {
        accessor: "dept.name",
        title: "Department",
        sortable: true,
        resizable: true,
      },
      {
        accessor: "createdBy",
        title: "Created By",
        render: (admin) =>
          admin.createdBy.isCreatedByMe ? "ME" : admin.createdBy.name,
        sortable: true,
        resizable: true,
      },
      {
        accessor: "createdAt",
        title: "Created At",
        render: (admin) => formatDateTime(admin.createdAt),
        sortable: true,
        resizable: true,
      },
    ],
  });

  return (
    <div className="h-fit ">
      <DataTable
        borderRadius="sm"
        fetching={isLoading}
        withTableBorder
        withColumnBorders
        striped
        highlightOnHover
        records={data?.data ?? []}
        columns={effectiveColumns}
      />
    </div>
  );
};

export { Clerk };
