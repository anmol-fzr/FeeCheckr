import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { DeptForm } from "@/components";
import { Button } from "@/components";

const AddDeptSheet = () => {
	return (
		<Sheet>
			<SheetTrigger>
				<Button>
					<Plus />
					Add New Dept
				</Button>
			</SheetTrigger>

			<SheetContent className="!w-[850px]">
				<SheetHeader>
					<SheetTitle>Add New Department</SheetTitle>
					<SheetDescription>This action cannot be undone.</SheetDescription>
				</SheetHeader>
				<DeptForm />
			</SheetContent>
		</Sheet>
	);
};

export { AddDeptSheet };
