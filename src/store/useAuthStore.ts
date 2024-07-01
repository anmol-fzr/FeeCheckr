import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { IAuthStore } from "./types";
import { zusLocalStorage } from "./storage"
import { registerStore } from "@/utils";

const creds = {
  isLogin: false,
  token: null,
  username: null,
  email: null,
} as const

const useStore = create<IAuthStore>()(
  persist(
    (set, get) => ({
      creds,
      resetCreds: () => set({ creds }),
      updateCreds: (creds) => {
        set({ creds: { ...get().creds, ...creds } })
      },
    }),
    { name: "useStore", storage: zusLocalStorage },
  ),
);


registerStore(useStore, useStore.persist.getOptions().name as string);

export { useStore };
