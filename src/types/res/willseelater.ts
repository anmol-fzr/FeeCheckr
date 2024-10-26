import { IRes } from ".";
import { IStudent } from ".";

type Daum = IStudent & {
  profile: Profile;
  fees: IFee[];
};

interface Profile {
  _id: string;
  name: string;
  mobile: number;
  admissionNo: number;
  rollNo: number;
  batch: number;
  createdAt: string;
  updatedAt: string;
}

interface IFee {
  _id: string;
  studentId: string;
  sbCollRef: string;
  amount: number;
  sem: number;
  feeType: string;
  hostelFeeAmount: number;
  securityAmount: number;
  fineAmount: number;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
}

type IResGetStudent = IRes<Daum>;

export type { IResGetStudent };
export type { IFee };
