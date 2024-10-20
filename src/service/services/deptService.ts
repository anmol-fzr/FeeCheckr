import { axiosInst } from "@/config";
import { IResGetDepts } from "@/types";
import { IReqCreateDept } from "@/types";

const DEPTS = {
  GET: () => axiosInst.get<IResGetDepts>("/dept"),
  CREATE: (data: IReqCreateDept) =>
    axiosInst.post<IReqCreateDept, IResGetDepts>("/dept", data),
} as const;

export { DEPTS };
