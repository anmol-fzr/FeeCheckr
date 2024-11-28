import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { ActionStatusDesc } from "./ActionStatusDesc";
import { ActionStatusTitle } from "./ActionStatusTitle";
import { HodForm } from "@/components";
import { Separator } from "../ui/separator";
import { usePageContext } from "@/hooks";

export function AddHodSheet() {
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
}
