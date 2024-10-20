import { Tipper } from "@/components";
import { Row } from "@tanstack/react-table";

type TableIdProps<T> = {
  row: Row<T>;
};

const TableId = <T,>({ row }: TableIdProps<T>) => {
  const id = row.getValue("_id") as string;

  return <Tipper tooltip={id}>{id.slice(16)}</Tipper>;
};

export { TableId };
