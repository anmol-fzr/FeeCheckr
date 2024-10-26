import { IRes } from ".";

interface IStudent {
  _id: string;
  email: string;
  password: string;
  name: string;
  batch: number;
  isVerified: boolean;
  details?: IStudentDetails;
  createdAt: string;
  updatedAt: string;
}

interface IStudentDetails {
  _id: string;
  mobile: number;
  admissionNo: number;
  rollNo: number;
  createdAt: string;
  updatedAt: string;
}

type IResGetStudents = IRes<IStudent[]>;

export type { IResGetStudents };
export type { IStudent, IStudentDetails };
export * from "./willseelater";
