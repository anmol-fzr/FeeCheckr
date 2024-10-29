import { IFee } from "./willseelater";
import { IRes } from ".";

type IResGetFee = IRes<IFee>;

type Root = IFee & {
  student: Student;
};

interface Student {
  _id: string;
  email: string;
  password: string;
  isVerified: boolean;
  details: {
    _id: string;
    name: string;
    mobile: number;
    admissionNo: number;
    rollNo: number;
    batch: number;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

type IResGetFees = IRes<Root[], true>;

export type { IResGetFee, IResGetFees };
