import { usePageParams } from "@/hooks";
import { SheetDescription } from "../ui/sheet";
import { useMemo } from "react";

const ActionStatusDesc = () => {
	const { status } = usePageParams();

	const props = useMemo(
		() => ({
			create:
				"Creating this resource will add new data to the system and make it available for use immediately.",
			update:
				"Updating this resource will modify the existing data, applying the changes you've made across the system.",
			delete:
				"Deleting this resource will permanently remove it from the system, and it will no longer be accessible.",
		}),
		[],
	);

	return (
		<SheetDescription
			className={status === "delete" ? "text-red-600 dark:text-red-400" : ""}
		>
			{status === null ? props.create : props[status]}
		</SheetDescription>
	);
};

export { ActionStatusDesc };
