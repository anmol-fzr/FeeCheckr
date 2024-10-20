import { axiosInst } from "@/config";
import { IReqLogin } from "@/types";
import { IResLogin } from "@/types";

const AUTH = {
  LOGIN: (data: IReqLogin) => axiosInst.post<IReqLogin, IResLogin>("/auth/login", data),
} as const;

export { AUTH };
