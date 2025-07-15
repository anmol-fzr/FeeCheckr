import { newHodSchema, updateHodSchema } from "@/schema";
import { InferType } from "yup";

type IReqCreateAdmin = InferType<typeof newHodSchema> & {
	mobile: number;
};

type IReqUpdateAdmin = InferType<typeof updateHodSchema>;

export type { IReqCreateAdmin, IReqUpdateAdmin };
