import { updateFeeSchema } from "@/schema";
import { InferType } from "yup";

type IReqUpdateFee = {
  status: InferType<typeof updateFeeSchema>;
};

export type { IReqUpdateFee };
