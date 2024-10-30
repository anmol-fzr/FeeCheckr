import { IFee } from "@/types";
import { Badge } from "@/components";
import { memo, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Color = "yellow" | "red" | "green";

const colorXStatus: Record<Color, string> = {
  yellow:
    "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 hover:text-yellow-700",
  green: "bg-green-100 text-green-700 hover:bg-green-100 hover:text-green-700",
  red: "bg-red-100 text-red-700 hover:bg-red-100 hover:text-red-700",
};

type StatusBadgeProps = {
  variant: Color;
  className?: string;
  children: ReactNode;
};

const StatusBadge = memo(
  ({ variant, children, className }: StatusBadgeProps) => {
    return (
      <Badge className={cn(colorXStatus[variant], className)}>{children}</Badge>
    );
  },
);

type Status = IFee["status"];

const variantXStatusMap: Record<Status, Color> = {
  pending: "yellow",
  rejected: "red",
  accepted: "green",
};

const FeeStatusBadge = memo(({ status }: { status: Status }) => {
  return (
    <StatusBadge variant={variantXStatusMap[status]}>
      {status.toUpperCase()}
    </StatusBadge>
  );
});

export { StatusBadge, FeeStatusBadge };
