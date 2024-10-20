interface IRes<Data> {
  data: Data;
  message: string;
  success: boolean;
}

type ITimeStamps = {
  createdAt: string;
  updatedAt: string;
};

export type { IRes, ITimeStamps };

export * from "./admin";
export * from "./auth";
export * from "./clerk";
export * from "./user";
export * from "./meta";
