import { create } from "zustand";
import { persist } from "zustand/middleware";
import { zusLocalStorage } from "./storage";
import { registerStore } from "@/utils";
import { Option } from "@/types";

type IMetaStore = {
  depts: Option[];
  setDepts: (depts: IMetaStore["depts"]) => void;
};

const useMetaStore = create<IMetaStore>()(
  persist(
    (set) => ({
      depts: [],

      setDepts: (newDepts) => set({ depts: newDepts }),
    }),
    { name: "useAuthStore", storage: zusLocalStorage },
  ),
);

registerStore(useMetaStore, useMetaStore.persist.getOptions().name as string);

export { useMetaStore };
