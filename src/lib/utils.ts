import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export { cn, cn as cx };

// Tremor Raw focusInput [v0.0.1]

export const focusInput = [
	// base
	"focus:ring-2",
	// ring color
	"focus:ring-blue-200 focus:dark:ring-blue-700/30",
	// border color
	"focus:border-blue-500 focus:dark:border-blue-700",
];

// Tremor Raw focusRing [v0.0.1]

export const focusRing = [
	// base
	"outline outline-offset-2 outline-0 focus-visible:outline-2",
	// outline color
	"outline-blue-500 dark:outline-blue-500",
];

// Tremor Raw hasErrorInput [v0.0.1]

export const hasErrorInput = [
	// base
	"ring-2",
	// border color
	"border-red-500 dark:border-red-700",
	// ring color
	"ring-red-200 dark:ring-red-700/30",
];

const enOrdinalRules = new Intl.PluralRules("en-US", { type: "ordinal" });

const suffixes = new Map([
	["one", "st"],
	["two", "nd"],
	["few", "rd"],
	["other", "th"],
]);

const formatOrdinals = (n: number) => {
	const rule = enOrdinalRules.select(n);
	const suffix = suffixes.get(rule);
	return `${n}${suffix}`;
};

export { formatOrdinals };
