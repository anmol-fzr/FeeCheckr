import { newClerkSchema, updateClerkSchema } from "@/schema";
import { InferType } from "yup";

type IReqCreateClerk = InferType<typeof newClerkSchema>;
type IReqUpdateClerk = InferType<typeof updateClerkSchema>;

export type { IReqCreateClerk, IReqUpdateClerk };
