import { useCallback, useState } from "react";

type FilterParams = Record<string, string | string[]>;

export function useFilterParams(initState: FilterParams = {}) {
	const [filterParams, setFilterParams] = useState<FilterParams>(initState);

	const appendFilterParams = useCallback((newParams: FilterParams) => {
		setFilterParams((curr) => ({
			...curr,
			...newParams,
		}));
	}, []);

	const resetFilterParams = useCallback(() => {
		setFilterParams(initState);
	}, []);

	const haveFilterParams = Object.is(filterParams, initState);

	return {
		filterParams,
		appendFilterParams,
		resetFilterParams,
		haveFilterParams,
	};
}
