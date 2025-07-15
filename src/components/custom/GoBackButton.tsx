import { memo } from "react";
import { Link } from "./Link";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

const GoBackButton = memo(() => (
	// @ts-ignore
	<Link to={-1} className="w-fit text-foreground">
		<ChevronLeftIcon />
		Go Back
	</Link>
));

export { GoBackButton };
