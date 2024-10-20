import { axiosInst } from "@/config";
import { IResGetMeta } from "@/types";

const META = {
  GET: () => axiosInst.get<IResGetMeta>("/meta"),
} as const;

export { META };
