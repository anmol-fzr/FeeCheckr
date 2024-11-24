import { Role } from "@/store/types";
import type { IRes } from "@/types";

interface Content {
	name: string;
	email: string;
	role: Role;
	token: string;
}

type IResLogin = IRes<Content>;
type IResUpdateAccount = IRes<never>;

export type { IResLogin, IResUpdateAccount };
