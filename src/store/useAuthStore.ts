import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IAuthStore } from "./types";
import { zusLocalStorage } from "./storage";
import { registerStore } from "@/utils";

const creds = {
  isLogin: false,
  token: null,
  email: "",
  name: null,
  role: null,
} as const;

const useAuthStore = create<IAuthStore>()(
  persist(
    (set, get) => ({
      creds,
      resetCreds: () => set({ creds }),
      updateCreds: (creds) => {
        set({ creds: { ...get().creds, ...creds } });
      },
    }),
    { name: "useAuthStore", storage: zusLocalStorage },
  ),
);

registerStore(useAuthStore, useAuthStore.persist.getOptions().name as string);

export { useAuthStore };
