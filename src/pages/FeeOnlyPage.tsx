import { useRouteParam } from "@/hooks";
import { formatOrdinals } from "@/lib/utils";
import { API } from "@/service";
import { IFee } from "@/types";
import { formatCurrency, formatDateTime } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  GoBackButton,
  Link,
} from "@/components";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ReactNode } from "react";
import { FeeStatusBadge } from "./StudentOnlyPage";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

type K = keyof IFee;
type D = {
  label: string;
  fmt: (k: any) => ReactNode;
};

const fmts: Record<K, D> = {
  sbCollRef: {
    label: "SB Collect Reference Number",
    fmt: (val) => val,
  },
  amount: {
    label: "Amount",
    fmt: formatCurrency,
  },
  sem: {
    label: "Semester",
    fmt: formatOrdinals,
  },
  feeType: {
    label: "Fee Type",
    fmt: (val) => val,
  },
  hostelFeeAmount: {
    label: "Hostel Fee Amount",
    fmt: formatCurrency,
  },
  securityAmount: {
    label: "Security Fee Amount",
    fmt: formatCurrency,
  },
  fineAmount: {
    label: "Fine Amount",
    fmt: formatCurrency,
  },
  createdAt: {
    label: "Submitted At",
    fmt: formatDateTime,
  },
};

const FeeOnlyPage = () => {
  let feeId = useRouteParam("feeId");

  const { isLoading, data } = useQuery({
    queryKey: ["FEES", feeId] as const,
    queryFn: ({ queryKey }) => API.FEES.ONE(queryKey[1]),
  });

  return (
    <>
      <GoBackButton />
      <Card className="w-full max-w-screen-md">
        <CardHeader>
          <CardTitle className="flex items-start justify-between">
            Fee Details
            {!isLoading && data?.data && (
              <FeeStatusBadge status={data?.data?.status} />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              {!isLoading &&
                data?.data &&
                Object.entries(data.data).map(([key, value]) => {
                  const f = fmts[key];
                  const shouldRender = f !== undefined;
                  return (
                    shouldRender && (
                      <TableRow key={key}>
                        <TableCell className="font-medium">{f.label}</TableCell>
                        <TableCell>{f.fmt(value)}</TableCell>
                      </TableRow>
                    )
                  );
                })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export { FeeOnlyPage };
