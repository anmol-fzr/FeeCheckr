import { axiosInst } from "@/config";
import { IResGetAdmins, IResGetAdmin, IReqParams } from "@/types";
import { IReqUpdateAdmin, IReqCreateAdmin } from "@/types";

const ADMIN = {
  GET: (params: IReqParams) => axiosInst.get("/hod", { params }),
  ONE: (adminId: string) => axiosInst.get<IResGetAdmin>(`/hod/${adminId}`),
  CREATE: (data: IReqCreateAdmin) =>
    axiosInst.post<IReqCreateAdmin, IResGetAdmins>("/hod", data),
  UPDATE: (adminId: string, data: IReqUpdateAdmin) =>
    axiosInst.patch<IReqUpdateAdmin, IResGetAdmins>(`/hod/${adminId}`, data),
  DELETE: (adminId: string) =>
    axiosInst.delete<IReqUpdateAdmin>(`/hod/${adminId}`),
} as const;

export { ADMIN };
