import { BrowserRouter } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary";
import type { OnlyChild } from "@/types"
import { ErrorPage } from "@/pages";

const Provider = ({ children }: OnlyChild) => (
  <BrowserRouter>
    <ErrorBoundary FallbackComponent={ErrorPage} onError={console.log}>
      {children}
    </ErrorBoundary >
  </BrowserRouter>
)

export { Provider }
