import { IRes } from "@/types";
import { GetNextPageParamFunction } from "@tanstack/react-query";

type IPaginateParams = {
	page: number;
	size: number;
};

const initialPageParam: IPaginateParams = {
	page: 1,
	size: 10,
} as const;

const getNextPageParam: GetNextPageParamFunction<
	IPaginateParams,
	IRes<any, true>
> = (lastPage, _, lastPageParam) => {
	const hasNextPage =
		Math.ceil(lastPage?.paginate?.total / lastPageParam?.size) >
		lastPageParam?.page;

	return hasNextPage
		? {
				page: lastPageParam?.page + 1,
				size: lastPageParam?.size,
			}
		: null;
};

export * from "./TableColumnToggler";
export * from "./TableColumnHeader";
export * from "./ActionsMenu";
export * from "./TableId";
export * from "./FullTableHeader";
export * from "./FullTableBody";
export * from "./TableFacetedFilter";
export * from "./TableProvider";
export * from "./ReactTable";

export { getNextPageParam, initialPageParam };
