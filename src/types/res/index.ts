import { AxiosError } from "axios";

type IPaginated = {
	limit: number;
	page: number;
	skip: number;
	total: number;
};

interface IRes<Data, isPaginated extends boolean = false> {
	data: Data;
	message: string;
	success: boolean;
	paginate: isPaginated extends true ? IPaginated : null;
}

type ITimeStamps = {
	createdAt: string;
	updatedAt: string;
};

type ServerError = AxiosError<IRes<never>>;

export type { IRes, ITimeStamps, ServerError, IPaginated };

export * from "./admin";
export * from "./auth";
export * from "./clerk";
export * from "./user";
export * from "./meta";
export * from "./dept";
export * from "./students";
export * from "./fees";
