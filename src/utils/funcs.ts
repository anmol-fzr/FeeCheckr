import { create } from "zustand";
import { envs } from "./envs";
import { baseURL } from "@/config";
import { useSettingsStore } from "@/store";
import { formatOrdinals } from "@/lib/utils";
import { InfiniteData } from "@tanstack/react-query";
import { IRes } from "@/types";

function registerStore(store: ReturnType<typeof create>, name: string) {
	if (
		typeof window !== "undefined" &&
		window.__REDUX_DEVTOOLS_EXTENSION__?.connect &&
		envs.DEV
	) {
		const connection = window?.__REDUX_DEVTOOLS_EXTENSION__?.connect({
			name,
		});
		connection?.init(store.getState());
		store.subscribe((newState) => connection?.send(name, newState));
		//console.info(`${name} Registered & Subscribed in Redux DevTools 🔧`);
	}
}

const getQueryKey = (path: string) => {
	const uri = new URL(path, baseURL);
	const pathnames: (Record<string, string> | string)[] =
		uri.pathname.split("/");

	pathnames.shift();

	const obj: Record<string, string> = {};

	if (uri.searchParams.size === 0) {
		return pathnames;
	}

	for (const [key, value] of uri.searchParams.entries()) {
		obj[key] = value;
	}
	pathnames.push(obj);
	return pathnames;
};

function formatDateTime(dateTime: Date | string): string {
	const styles = useSettingsStore.getState().dateTime;
	return new Intl.DateTimeFormat("en-IN", {
		...styles,
		timeZone: "Asia/Kolkata",
	})
		.format(new Date(dateTime))
		.toString();
}

const formatCurrency = (n: number) => {
	const formatter = new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
	});
	return formatter.format(n);
};

const batchToClgYear = (batch: number, withParenthesis = true) => {
	const year = new Date().getFullYear();
	let value = "";
	if (withParenthesis) {
		value += " ( ";
	}
	value += formatOrdinals(year - batch + 1);
	if (withParenthesis) {
		value += " Year  ) ";
	}
	return value;
};

const findFromInfiniteData = <TData extends Object>(
	cache: InfiniteData<IRes<TData[], true>>,
	predicate: (value: TData, index: number, obj: TData[]) => boolean,
) => {
	let foundObj: TData | undefined;

	for (const page of cache.pages) {
		foundObj = page.data.find(predicate);
		if (foundObj) break;
	}
	return foundObj;
};

export {
	registerStore,
	getQueryKey,
	formatDateTime,
	formatCurrency,
	batchToClgYear,
	findFromInfiniteData,
};
