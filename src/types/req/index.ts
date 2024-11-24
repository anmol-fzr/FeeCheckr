import type { ParsedUrlQueryInput } from "querystring";

type IReqPagination = {
	size?: number;
	page?: number;
};

type IReqParams = ParsedUrlQueryInput;

export type { IReqPagination, IReqParams };

export * from "./auth";
export * from "./admin";
export * from "./dept";
export * from "./clerk";
export * from "./fee";
