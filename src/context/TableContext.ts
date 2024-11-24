import { createContext } from "react";

const appState: ITableContext = {
	page: 1,
	onNextPage: () => {},
	onPrevPage: () => {},
} as const;

type ITableContext = {
	page: number;
	onNextPage: () => void;
	onPrevPage: () => void;
};

const TableContext = createContext<ITableContext>(appState);

export { TableContext };
