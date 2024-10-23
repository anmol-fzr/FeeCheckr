import { AxiosError } from "axios";

interface IRes<Data> {
  data: Data;
  message: string;
  success: boolean;
}

type ITimeStamps = {
  createdAt: string;
  updatedAt: string;
};

type ServerError = AxiosError<IRes<never>>;

export type { IRes, ITimeStamps, ServerError };

export * from "./admin";
export * from "./auth";
export * from "./clerk";
export * from "./user";
export * from "./meta";
export * from "./dept";
