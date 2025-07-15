import { IResGetAdmins, IAdmin, IRes } from ".";

type IClerk = IAdmin;

type IResGetClerks = IResGetAdmins & {
	currPage: number;
	currPageSize: number;
	totalPages: number;
};
type IResGetClerk = IRes<IClerk, true>;

export type { IResGetClerks, IResGetClerk };
export type { IClerk };
