import { useContext, useEffect } from "react";
import { AppContext } from "@/context";

const useAppContext = () => {
  const appContext = useContext(AppContext);

  useEffect(() => {
    if (!appContext) {
      throw new Error(`useAppContext must be used inside AppContext see https://react.dev/reference/react/useContext#my-component-doesnt-see-the-value-from-my-provider`)
    }
  }, [appContext])

  return appContext
}

export { useAppContext }
