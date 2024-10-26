import { axiosInst } from "@/config";
import { IResGetFee } from "@/types";

const uri = "/fees";

const FEES = {
  ONE: (feesId: string) =>
    axiosInst.get<IResGetFee, IResGetFee>(`${uri}/${feesId}`),
  //CREATE: (data: IReqCreateClerk) =>
  //  axiosInst.post<IReqCreateClerk, IResGetClerk>(uri, data),
  //UPDATE: (clerkId: string, data: IReqUpdateClerk) =>
  //  axiosInst.patch<IReqUpdateClerk, IResGetClerk>(`${uri}/${clerkId}`, data),
  //DELETE: (clerkId: string) =>
  //  axiosInst.patch<never, never>(`${uri}/${clerkId}`),
} as const;

export { FEES };
