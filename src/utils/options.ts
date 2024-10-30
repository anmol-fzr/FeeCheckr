import { capitalCase } from "change-case";

const feeStatuses = ["pending", "accepted", "rejected"] as const;
const feeTypes = [
  "Full Fee",
  "PMSS 40",
  "PMSS 60",
  "PMSS 100",
  "Scholarship Bihar",
  "Scholarship J & K",
  "Pre-registration",
  "Re-appear",
  "Any Other",
];

const sems = Array.from({ length: 8 }, (_, i) => `${i + 1}`);

const feeStatusOptions = feeStatuses.map((value) => ({
  label: capitalCase(value),
  value,
}));

export { feeStatusOptions };
export { feeStatuses, sems, feeTypes };
