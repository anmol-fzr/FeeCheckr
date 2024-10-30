import { Tipper } from "@/components";
import { ITimeStamps } from "@/types";
import { formatDateTime } from "@/utils";
import { Row } from "@tanstack/react-table";
import { ComponentPropsWithoutRef, memo } from "react";

type TableColBaseProps<TData> = {
  row: Row<TData>;
};

const TableId = <TData,>({ row }: TableColBaseProps<TData>) => {
  const id = row.getValue("_id") as string;

  return (
    <Tipper tooltip={id}>
      <TableColMuted>{id.slice(16)}</TableColMuted>
    </Tipper>
  );
};

const TableColCreatedAt = <TData,>({ row }: TableColBaseProps<TData>) => {
  const date = (row.original as ITimeStamps).createdAt;
  const formatted = formatDateTime(date);
  return <div className="font-medium">{formatted}</div>;
};

const TableColUpdatedAt = <T,>({ row }: TableColBaseProps<T>) => {
  const updatedAt = (row.original as ITimeStamps).updatedAt;
  const createdAt = (row.original as ITimeStamps).createdAt;
  return createdAt === updatedAt ? (
    <TableColMuted>Never Updated</TableColMuted>
  ) : (
    <div className="font-medium">{formatDateTime(updatedAt)}</div>
  );
};

const TableColMuted = memo((props: ComponentPropsWithoutRef<"span">) => (
  <span className="text-muted-foreground" {...props} />
));

const TableColNA = memo(() => <TableColMuted>N/A</TableColMuted>);

export { TableId, TableColCreatedAt, TableColUpdatedAt, TableColNA };
