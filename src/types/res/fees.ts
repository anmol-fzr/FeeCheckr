import { IFee } from "./willseelater";
import { IRes, ITimeStamps } from ".";

type IResGetFee = IRes<IFee & { pdfUri: string }>;

interface Root extends ITimeStamps {
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
	student: {
		_id: string;
		email: string;
		name: string;
		mobile: number;
		admissionNo: number;
		rollNo: number;
		batch: number;
		createdAt: string;
		updatedAt: string;
	};
}

type IResGetFees = IRes<Root[], true>;

export type { IResGetFee, IResGetFees };
