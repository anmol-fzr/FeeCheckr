import { axiosInst } from "@/config";
import { IReqLogin, IReqUpdateAccount } from "@/types";
import { IResLogin, IResUpdateAccount } from "@/types";

const AUTH = {
	LOGIN: (data: IReqLogin) =>
		axiosInst.post<IReqLogin, IResLogin>("/auth/login", data),
	UPDATE: (data: IReqUpdateAccount) =>
		axiosInst.patch<IReqLogin, IResUpdateAccount>("/auth", data),
} as const;

export { AUTH };
