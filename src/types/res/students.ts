import { IRes, ITimeStamps } from ".";

interface IStudent extends ITimeStamps {
  _id: string;
  email: string;
  password: string;
  name: string;
  batch: number;
  isVerified: boolean;
  details?: IStudentDetails;
}

interface IStudentDetails {
  _id: string;
  mobile: number;
  admissionNo: number;
  rollNo: number;
  createdAt: string;
  updatedAt: string;
}

type IResGetStudents = IRes<IStudent[], true>;

export type { IResGetStudents };
export type { IStudent, IStudentDetails };
export * from "./willseelater";
