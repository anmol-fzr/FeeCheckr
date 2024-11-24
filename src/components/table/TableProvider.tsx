import { TableContext } from "@/context";
import { ReactNode, useCallback, useMemo, useState } from "react";

type Props = {
	children: ReactNode;
};

const TableProvider = ({ children }: Props) => {
	const [page, setPage] = useState(1);

	const onNextPage = useCallback(() => setPage((c) => c + 1), []);
	const onPrevPage = useCallback(() => setPage((c) => c - 1), []);

	const value = useMemo(
		() => ({ page, onNextPage, onPrevPage }),
		[page, onNextPage, onPrevPage],
	);

	return (
		<TableContext.Provider value={value}>{children}</TableContext.Provider>
	);
};

export { TableProvider };
