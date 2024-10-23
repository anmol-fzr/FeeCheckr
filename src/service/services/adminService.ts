import { axiosInst } from "@/config";
import { IResGetAdmins, IResGetAdmin } from "@/types";
import { IReqUpdateAdmin, IReqCreateAdmin } from "@/types";

type IReqGetAdmins = {
  deptId?: string;
};

const ADMIN = {
  GET: (params: IReqGetAdmins) =>
    axiosInst.get<IResGetAdmins>("/admin", { params }),
  ONE: (adminId: string) => axiosInst.get<IResGetAdmin>(`/admin/${adminId}`),
  CREATE: (data: IReqCreateAdmin) =>
    axiosInst.post<IReqCreateAdmin, IResGetAdmins>("/admin", data),
  UPDATE: (adminId: string, data: IReqUpdateAdmin) =>
    axiosInst.patch<IReqUpdateAdmin, IResGetAdmins>(`/admin/${adminId}`, data),
  DELETE: (adminId: string) =>
    axiosInst.delete<IReqUpdateAdmin>(`/admin/${adminId}`),
} as const;

export { ADMIN };
