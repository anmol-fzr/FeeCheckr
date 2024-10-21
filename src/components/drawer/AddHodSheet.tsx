import {
  Sheet,
  SheetContent,
  SheetDescription,
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
          <ActionStatusTitle title="Head of Department" />
          <ActionStatusDesc />
        </SheetHeader>
        <Separator className="my-4" />
        <HodForm />
      </SheetContent>
    </Sheet>
  );
};

type Props = {
  title: string;
};

const ActionStatusTitle = ({ title }: Props) => {
  const { status } = usePageParams();

  const messages = {
    create: `Add ${title}`,
    update: `Update ${title}`,
    delete: `Delete ${title}`,
  };

  return (
    <SheetTitle>
      {status === null ? messages.create : messages[status]}
    </SheetTitle>
  );
};

const ActionStatusDesc = () => {
  const { status } = usePageParams();

  const props = {
    create:
      "Creating this resource will add new data to the system and make it available for use immediately.",
    update:
      "Updating this resource will modify the existing data, applying the changes you've made across the system.",
    delete:
      "Deleting this resource will permanently remove it from the system, and it will no longer be accessible.",
  };
  return (
    <SheetDescription
      className={status === "delete" ? "text-red-600 dark:text-red-400" : " "}
    >
      {status === null ? props.create : props[status]}
    </SheetDescription>
  );
};

export { AddHodSheet };
