import { Tipper } from "@/components";
import { ITimeStamps } from "@/types";
import { formatDateTime } from "@/utils";
import { Row } from "@tanstack/react-table";

type TableColBaseProps<TData> = {
  row: Row<TData>;
};

const TableId = <TData,>({ row }: TableColBaseProps<TData>) => {
  const id = row.getValue("_id") as string;

  return <Tipper tooltip={id}>{id.slice(16)}</Tipper>;
};

const TableColCreatedAt = <TData,>({ row }: TableColBaseProps<TData>) => {
  const date = (row.original as ITimeStamps).createdAt;
  const formatted = formatDateTime(date);
  return <div className="font-medium">{formatted}</div>;
};

const TableColUpdatedAt = <T,>({ row }: TableColBaseProps<T>) => {
  const updatedAt = (row.original as ITimeStamps).updatedAt;
  const createdAt = (row.original as ITimeStamps).createdAt;
  return (
    <div className="font-medium">
      {createdAt === updatedAt ? "Never Updated" : formatDateTime(updatedAt)}
    </div>
  );
};

export { TableId, TableColCreatedAt, TableColUpdatedAt };
