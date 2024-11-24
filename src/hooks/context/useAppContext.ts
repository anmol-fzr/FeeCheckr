import { useContext } from "react";
import { PageContext } from "@/context";

const usePageContext = () => {
	const appContext = useContext(PageContext);

	if (!appContext) {
		throw new Error(
			`usePageContext must be used inside PageContext see https://react.dev/reference/react/useContext#my-component-doesnt-see-the-value-from-my-provider`,
		);
	}

	return appContext;
};

export { usePageContext };
