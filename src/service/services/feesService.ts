import { axiosInst } from "@/config";
import { IResGetFee, IResGetFees, IReqUpdateFee } from "@/types";
import { IReqParams } from "@/types";

const uri = "/fees";

const FEES = {
  GET: (params: IReqParams) =>
    axiosInst.get<IResGetFees, IResGetFees>(`${uri}`, { params }),
  ONE: (feesId: string) =>
    axiosInst.get<IResGetFee, IResGetFee>(`${uri}/${feesId}`),
  UPDATE: (feeId: string, data: IReqUpdateFee) =>
    axiosInst.patch<never, never>(`${uri}/${feeId}`, data),
  //DELETE: (clerkId: string) =>
  //  axiosInst.patch<never, never>(`${uri}/${clerkId}`),
} as const;

export { FEES };
