import { newHodSchema } from "@/schema";
import { InferType } from "yup";

type IReqCreateAdmin = InferType<typeof newHodSchema>;

export type { IReqCreateAdmin };
