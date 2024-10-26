import { buttonVariants } from "../ui";
import { Link as RawLink, LinkProps as RawLinkProps } from "react-router-dom";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export interface LinkProps
  extends RawLinkProps,
    VariantProps<typeof buttonVariants> {
  className?: string;
}

const Link = ({ variant = "link", size, className, ...props }: LinkProps) => (
  <RawLink
    className={cn(buttonVariants({ variant, size, className }))}
    {...props}
  />
);

export { Link };
