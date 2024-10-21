import { createContext } from "react";

const appState: IPageContext = {
  isOpen: false,
  onOpenChange: () => {},
  handleNew: () => {},
  handleEdit: () => {},
  handleDelete: () => {},
} as const;

type IPageContext = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  handleNew: () => void;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
};

const PageContext = createContext<IPageContext>(appState);
const PageProvider = PageContext.Provider;

export { PageContext, PageProvider };
