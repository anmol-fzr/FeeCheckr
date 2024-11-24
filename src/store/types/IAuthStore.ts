const roles = ["superadmin", "hod", "clerk", "student"] as const;

type Role = (typeof roles)[number];

type ICreds = {
	token: string | null;
	isLogin: boolean;
	email: string;
	name: string;
	role: Role;
};

type IAuthStoreData = {
	creds: ICreds;
};

type IAuthStoreActions = {
	resetCreds: () => void;
	updateCreds: (creds: Partial<ICreds>) => void;
};

type IAuthStore = IAuthStoreData & IAuthStoreActions;

export type { ICreds, IAuthStore, Role };
