import { useContext, useEffect } from "react";
import { PageContext } from "@/context";

const usePageContext = () => {
  const appContext = useContext(PageContext);

  useEffect(() => {
    if (!appContext) {
      throw new Error(
        `usePageContext must be used inside PageContext see https://react.dev/reference/react/useContext#my-component-doesnt-see-the-value-from-my-provider`,
      );
    }
  }, [appContext]);

  return appContext;
};

export { usePageContext };
