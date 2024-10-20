import { Role } from "@/store/types";
import type { IRes } from "@/types";

interface Content {
  name: string;
  role: Role;
  token: string;
}

type IResLogin = IRes<Content>;

export type { IResLogin };
