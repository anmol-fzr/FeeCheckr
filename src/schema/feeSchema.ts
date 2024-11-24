import { object, string } from "yup";
import { feeStatuses } from "@/utils/options";

const updateFeeSchema = object({
	status: string().oneOf(feeStatuses),
});

export { updateFeeSchema };
