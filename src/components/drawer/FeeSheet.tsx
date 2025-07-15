import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { FeeForm } from "@/components";
import { usePageContext } from "@/hooks";
import { Separator } from "../ui/separator";
import { ActionStatusDesc } from "./ActionStatusDesc";
import { ActionStatusTitle } from "./ActionStatusTitle";

const FeeSheet = () => {
	const { isOpen, onOpenChange } = usePageContext();

	return (
		<Sheet open={isOpen} onOpenChange={onOpenChange}>
			<SheetContent className="!w-[850px]">
				<SheetHeader>
					<ActionStatusTitle title="Fee" />
					<ActionStatusDesc />
				</SheetHeader>
				<Separator className="my-4" />
				<FeeForm />
			</SheetContent>
		</Sheet>
	);
};
export { FeeSheet };
