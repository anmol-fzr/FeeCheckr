import { axiosInst } from "@/config";
import { IResGetStudent, IResGetStudents } from "@/types";
import qs from "querystring";

const uri = "/students";

const STUDENTS = {
	GET: (params: any) =>
		axiosInst.get<IResGetStudents, IResGetStudents>(uri, {
			params,
			paramsSerializer: (params) => {
				return qs.stringify(params);
			},
		}),
	ONE: (studentId: string) =>
		axiosInst.get<IResGetStudent, IResGetStudent>(`${uri}/${studentId}`),
	//CREATE: (data: IReqCreateClerk) =>
	//  axiosInst.post<IReqCreateClerk, IResGetClerk>(uri, data),
	//UPDATE: (clerkId: string, data: IReqUpdateClerk) =>
	//  axiosInst.patch<IReqUpdateClerk, IResGetClerk>(`${uri}/${clerkId}`, data),
	//DELETE: (clerkId: string) =>
	//  axiosInst.patch<never, never>(`${uri}/${clerkId}`),
} as const;

export { STUDENTS };
