import { BrowserRouter } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { envs } from "@/utils";
import { queryClient } from "@/config";
import type { OnlyChild } from "@/types"
import { ErrorPage } from "@/pages";

const Provider = ({ children }: OnlyChild) => (
  <BrowserRouter>
    <ErrorBoundary FallbackComponent={ErrorPage} onError={console.log}>
      <QueryClientProvider client={queryClient}>
        {children}
        {envs.DEV && (<ReactQueryDevtools initialIsOpen={false} />)}
      </QueryClientProvider>
    </ErrorBoundary >
  </BrowserRouter>
)

export { Provider }
