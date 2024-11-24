import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "../theme-provider";
import { MantineProvider } from "@mantine/core";
import { envs } from "@/utils";
import { queryClient } from "@/config";
import type { OnlyChild } from "@/types";
import { ErrorPage } from "@/pages";

const Provider = ({ children }: OnlyChild) => {
	return (
		<BrowserRouter>
			<ErrorBoundary FallbackComponent={ErrorPage} onError={console.log}>
				<QueryClientProvider client={queryClient}>
					<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
						<Toaster />
						<MantineProvider defaultColorScheme="auto">
							{children}
						</MantineProvider>
						{envs.isDev && <ReactQueryDevtools initialIsOpen={false} />}
					</ThemeProvider>
				</QueryClientProvider>
			</ErrorBoundary>
		</BrowserRouter>
	);
};

export { Provider };
