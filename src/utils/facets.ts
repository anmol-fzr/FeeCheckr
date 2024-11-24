import { Option } from "@/types";
import { sems, feeTypes } from "./options";
import { formatOrdinals } from "@/lib/utils";

const proComp = [
	{
		label: "Complete",
		value: "complete",
	},
	{
		label: "UnComplete",
		value: "uncomplete",
	},
];

const profileCompletedOpts = [
	{
		label: "Completed",
		value: true,
	},
	{
		label: "Uncomplete",
		value: false,
	},
];

const profileVerifiedOpts = [
	{
		label: "Verified",
		value: true,
	},
	{
		label: "Unverified",
		value: false,
	},
];

const year = new Date().getFullYear();
const batchFacets: Option[] = [];

for (let index = 0; index < 6; index++) {
	batchFacets.push({
		label: (year - index).toString(),
		value: (year - index).toString(),
	});
}

const statuses = [
	{
		value: "2021",
		label: "2021",
	},
	{
		value: "2022",
		label: "2022",
	},
	{
		value: "2024",
		label: "2024",
	},
];

const feeType = feeTypes.map((value) => ({ label: value, value }));

const semOpts = sems.map((value) => ({
	label: formatOrdinals(Number(value)),
	value,
}));

export {
	semOpts,
	proComp,
	profileCompletedOpts,
	profileVerifiedOpts,
	statuses,
	feeType,
	batchFacets,
};
