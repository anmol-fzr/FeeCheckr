/**
 * This Hook is meant to fetch the next page using the `fetchNextPage` each time
 * user is about to reach the end of the table / list items, rendered by `@tanstack/react-virtual``
 * */

import { Virtualizer } from "@tanstack/react-virtual";
import { DefinedUseInfiniteQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";

type PropsFromTQuery = Pick<
	DefinedUseInfiniteQueryResult,
	"fetchNextPage" | "isFetchingNextPage" | "hasNextPage"
>;

type Props<Data> = PropsFromTQuery & {
	rowVirtualizer: Virtualizer<any, any>;
	allRows: Data[];
};

const useInfinitePage = <Data>(props: Props<Data>) => {
	const {
		rowVirtualizer,
		allRows,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = props;

	useEffect(() => {
		const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

		if (!lastItem) {
			return;
		}

		if (
			lastItem.index >= allRows.length - 1 &&
			hasNextPage &&
			!isFetchingNextPage
		) {
			fetchNextPage();
		}
	}, [
		hasNextPage,
		fetchNextPage,
		allRows.length,
		isFetchingNextPage,
		rowVirtualizer.getVirtualItems(),
	]);
};

export { useInfinitePage };
