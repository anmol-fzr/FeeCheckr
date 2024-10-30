import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode, ComponentProps } from "react";

type TipperProps = ComponentProps<typeof Tooltip> & {
  children: ReactNode;
  tooltip: string;
};

const Tipper = ({ children, tooltip, ...props }: TipperProps) => {
  return (
    <TooltipProvider>
      <Tooltip {...props}>
        <TooltipTrigger type="button">{children}</TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { Tipper };
