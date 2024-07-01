import type { IRes } from "@/types";

interface Content {
  username: string;
  email: string;
  token: string;
}

type ILoginRes = IRes<Content>;
type ILogoutRes = IRes<null>;

export type { ILoginRes, ILogoutRes };
