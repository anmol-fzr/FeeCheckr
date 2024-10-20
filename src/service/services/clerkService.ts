import { axiosInst } from "@/config";
import { IResGetClerks } from "@/types";

const CLERK = {
  GET: () => axiosInst.get<IResGetClerks>("/clerk"),
} as const;

export { CLERK };
