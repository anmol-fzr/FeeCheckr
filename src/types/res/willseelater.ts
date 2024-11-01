import { IRes, ITimeStamps } from ".";
import { IStudent } from ".";

interface Fee extends ITimeStamps {
  studentId: string;
  sbCollRef: string;
  amount: number;
  sem: number;
  feeType: string;
  hostelFeeAmount: number;
  securityAmount: number;
  fineAmount: number;
  status: string;
}

type StudentWithFee = IStudent & { fees: Fee[] };
type IResGetStudent = IRes<StudentWithFee>;

export type { IResGetStudent };
export type { Fee as IFee };
