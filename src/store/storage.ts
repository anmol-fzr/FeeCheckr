import { createJSONStorage } from "zustand/middleware";

// Global localStorage
const zusLocalStorage = createJSONStorage(() => localStorage);

export { zusLocalStorage };
