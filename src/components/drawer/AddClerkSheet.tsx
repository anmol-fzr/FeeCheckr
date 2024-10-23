import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { ClerkForm } from "@/components";
import { usePageContext } from "@/hooks";
import { Separator } from "../ui/separator";
import { ActionStatusDesc } from "./ActionStatusDesc";
import { ActionStatusTitle } from "./ActionStatusTitle";

const AddClerkSheet = () => {
  const { isOpen, onOpenChange } = usePageContext();

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="!w-[850px]">
        <SheetHeader>
          <ActionStatusTitle title="Clerk" />
          <ActionStatusDesc />
        </SheetHeader>
        <Separator className="my-4" />
        <ClerkForm />
      </SheetContent>
    </Sheet>
  );
};
export { AddClerkSheet };
