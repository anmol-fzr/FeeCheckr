import { createContext } from "react";

const appState = {
  isOpen: false,
  onOpenChange: (_open: boolean) => {},
  handleNew: () => {},
  handleEdit: (_id: string) => {},
  handleDelete: (_id: string) => {},
} as const;

const PageContext = createContext(appState);
const PageProvider = PageContext.Provider;

export { PageContext, PageProvider };
