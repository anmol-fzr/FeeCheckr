import { axiosInst } from "@/config";
import { IResGetAdmins, IResGetAdmin } from "@/types";
import { IReqUpdateAdmin, IReqCreateAdmin } from "@/types";

const ADMIN = {
  GET: () => axiosInst.get<IResGetAdmins>("/admin"),
  ONE: (adminId: string) => axiosInst.get<IResGetAdmin>(`/admin/${adminId}`),
  CREATE: (data: IReqCreateAdmin) =>
    axiosInst.post<IReqCreateAdmin, IResGetAdmins>("/admin", data),
  UPDATE: (adminId: string, data: IReqUpdateAdmin) =>
    axiosInst.patch<IReqUpdateAdmin, IResGetAdmins>(`/admin/${adminId}`, data),
} as const;

export { ADMIN };
