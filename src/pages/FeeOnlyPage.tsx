import { useRouteParam } from "@/hooks";
import { formatOrdinals } from "@/lib/utils";
import { API } from "@/service";
import { IFee } from "@/types";
import { formatCurrency, formatDateTime } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FeeForm,
  GoBackButton,
  StudenFeePdf,
} from "@/components";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ReactNode, useEffect } from "react";
import { FeeStatusBadge } from "./StudentOnlyPage";
import { useSearchParams } from "react-router-dom";

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
  const feeId = useRouteParam("feeId");
  const [_, setSearchParams] = useSearchParams();

  const { isLoading, data } = useQuery({
    queryKey: ["FEES", feeId] as const,
    queryFn: ({ queryKey }) => API.FEES.ONE(queryKey[1]),
  });

  useEffect(() => {
    setSearchParams({ _id: feeId });
  }, [feeId, setSearchParams]);

  const uri = data?.data?.pdfUri;

  return (
    <>
      <GoBackButton />
      <div className="flex gap-4 justify-between">
        <div className="w-full flex flex-col gap-4">
          <Card className="w-full max-w-screen-md h-fit">
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
                            <TableCell className="font-medium">
                              {f.label}
                            </TableCell>
                            <TableCell>{f.fmt(value)}</TableCell>
                          </TableRow>
                        )
                      );
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="w-full max-w-screen-md h-fit ">
            <CardHeader>Update Fee Details</CardHeader>
            <CardContent>
              <FeeForm hideCancel btnProps={{ className: "w-fit" }} />
            </CardContent>
          </Card>
        </div>
        {!isLoading && (uri ? <StudenFeePdf file={uri} /> : <>No Pdf Found</>)}
      </div>
    </>
  );
};

export { FeeOnlyPage };
