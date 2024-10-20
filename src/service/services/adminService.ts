import { axiosInst } from "@/config";
import { IResGetAdmins } from "@/types";
import { IReqCreateAdmin } from "@/types";

const ADMIN = {
  GET: () => axiosInst.get<IResGetAdmins>("/admin"),
  CREATE: (data: IReqCreateAdmin) =>
    axiosInst.post<IReqCreateAdmin, IResGetAdmins>("/admin", data),
} as const;

export { ADMIN };
