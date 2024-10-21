import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { HodForm } from "@/components";
import { usePageContext, usePageParams } from "@/hooks";
import { Separator } from "../ui/separator";

const AddHodSheet = () => {
  const { isOpen, onOpenChange } = usePageContext();

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="!w-[850px]">
        <SheetHeader>
          <Status create="Add HOD" update="Update HOD" delete="Delete HOD" />
        </SheetHeader>
        <Separator className="my-3" />
        <HodForm />
      </SheetContent>
    </Sheet>
  );
};

type Props = {
  create: string;
  update: string;
  delete: string;
};

const Status = (props: Props) => {
  const { status } = usePageParams();

  return (
    <SheetTitle>{status === null ? props.create : props[status]}</SheetTitle>
  );
};

export { AddHodSheet };
