import { create } from "zustand";
import { persist } from "zustand/middleware";
import { zusLocalStorage } from "./storage";

type Style = "full" | "long" | "short" | "medium";

export interface ISettingStore {
	dateTime: {
		dateStyle: Style;
		timeStyle: Style;
	};

	updateSettings: (s: Partial<ISettingStore["dateTime"]>) => void;
}

const useSettingsStore = create<ISettingStore>()(
	persist(
		(set, get) => ({
			dateTime: {
				dateStyle: "long",
				timeStyle: "short",
			},

			updateSettings: (newStyle) =>
				set({ dateTime: { ...get().dateTime, ...newStyle } }),
		}),
		{
			name: "Settings Store",
			storage: zusLocalStorage,
		},
	),
);

export { useSettingsStore };
