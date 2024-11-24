import { usePageParams } from "@/hooks";
import { SheetTitle } from "../ui/sheet";
import { useMemo } from "react";

type ActionStatusTitleProps = {
	title: string;
};

const ActionStatusTitle = ({ title }: ActionStatusTitleProps) => {
	const { status } = usePageParams();

	const messages = useMemo(
		() => ({
			create: `Add ${title}`,
			update: `Update ${title}`,
			delete: `Delete ${title}`,
		}),
		[title],
	);

	return (
		<SheetTitle>
			{status === null ? messages.create : messages[status]}
		</SheetTitle>
	);
};

export { ActionStatusTitle };
