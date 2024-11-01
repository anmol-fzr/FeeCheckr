import { IRes, ITimeStamps } from ".";

interface IStudent extends ITimeStamps {
  _id: string;
  email: string;
  name: string;
  mobile: number;
  admissionNo: number;
  rollNo: number;
  batch: number;
}

interface IStudentDetails extends ITimeStamps {}

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

type IResGetStudents = IRes<IStudent[], true>;

export type { IResGetStudents };
export type { IStudent, IStudentDetails };
export * from "./willseelater";
