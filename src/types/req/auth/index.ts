type IReqLogin = {
	email: string;
	password: string;
};

type IReqUpdateAccount = Pick<IReqLogin, "password">;

export type { IReqLogin, IReqUpdateAccount };
