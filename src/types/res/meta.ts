import { IRes } from ".";

type Option = {
  label: string;
  value: string;
};

type IResGetMeta = IRes<{
  depts: Option[];
}>;

export type { IResGetMeta };
export type { Option };
