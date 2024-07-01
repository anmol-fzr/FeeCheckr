import { axiosInst } from "@/config";
import { ILoginReq } from "@/types";

const AUTH = {
  LOGIN: (data: ILoginReq) => axiosInst.post<ILoginReq>("/dashboard/login/", data),
} as const

export { AUTH };
