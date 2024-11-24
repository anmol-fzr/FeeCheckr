import { IRes, ITimeStamps } from ".";

type IDept = ITimeStamps & {
	_id: string;
	name: string;
	createdBy: IAdminCreatedBy;
};

type IAdmin = ITimeStamps & {
	_id: string;
	name: string;
	mobile: number;
	email: string;
	role: string;
	createdBy: IAdminCreatedBy;
	dept: IDept;
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
export type { IAdmin, IDept, IAdminCreatedBy };
