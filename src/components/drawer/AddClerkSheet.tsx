import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { ActionStatusDesc } from "./ActionStatusDesc";
import { ActionStatusTitle } from "./ActionStatusTitle";
import { ClerkForm } from "@/components";
import { Separator } from "../ui/separator";
import { usePageContext } from "@/hooks";

export function AddClerkSheet() {
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
}
