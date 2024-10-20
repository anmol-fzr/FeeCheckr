import { newDeptSchema } from "@/schema";
import { InferType } from "yup";

type IReqCreateDept = InferType<typeof newDeptSchema>;

export type { IReqCreateDept };
