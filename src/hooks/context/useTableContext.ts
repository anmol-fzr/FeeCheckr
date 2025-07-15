import { useContext } from "react";
import { TableContext } from "@/context";

const useTableContext = () => {
	const appContext = useContext(TableContext);

	if (!appContext) {
		throw new Error(
			`useTableContext must be used inside TableContext see https://react.dev/reference/react/useContext#my-component-doesnt-see-the-value-from-my-provider`,
		);
	}

	return appContext;
};

export { useTableContext };
