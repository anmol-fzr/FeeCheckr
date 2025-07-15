import { IRes, ITimeStamps } from ".";

type IAdmin = ITimeStamps & {
	_id: string;
	name: string;
	mobile: number;
	email: string;
	role: string;
	createdBy: IAdminCreatedBy;
};

type IAdminCreatedBy = ITimeStamps & {
	_id: string;
	name: string;
	mobile: number;
	email: string;
	role: string;
	isCreatedByMe: boolean;
};

type IResGetAdmins = IRes<IAdmin[], true>;
type IResGetAdmin = IRes<IAdmin>;

export type { IResGetAdmins, IResGetAdmin };
export type { IAdmin, IAdminCreatedBy };
