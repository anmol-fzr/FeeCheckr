import { axiosInst } from "@/config";
import { IResGetClerk, IResGetClerks } from "@/types";
import { IReqPagination, IReqCreateClerk, IReqUpdateClerk } from "@/types";

const uri = "/clerk";

type IReqGetClerk = IReqPagination;
//& {
//	clerkId?: string;
//};

const CLERK = {
	GET: (params?: IReqGetClerk | null | undefined) =>
		axiosInst.get<IResGetClerks>(uri, { params }),
	ONE: (clerkId: string) => axiosInst.get<IResGetClerk>(`${uri}/${clerkId}`),
	CREATE: (data: IReqCreateClerk) =>
		axiosInst.post<IReqCreateClerk, IResGetClerk>(uri, data),
	UPDATE: (clerkId: string, data: IReqUpdateClerk) =>
		axiosInst.patch<IReqUpdateClerk, IResGetClerk>(`${uri}/${clerkId}`, data),
	DELETE: (clerkId: string) =>
		axiosInst.patch<never, never>(`${uri}/${clerkId}`),
} as const;

export { CLERK };
