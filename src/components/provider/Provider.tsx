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
//import { API } from "@/service";
//import { useEffect } from "react";
//import { useMetaStore } from "@/store";

//const setDepts = useMetaStore.getState().setDepts;

const Provider = ({ children }: OnlyChild) => {
	//useEffect(() => {
	//  API.META.GET()
	//    .then((res) => {
	//      setDepts(res.data.depts);
	//    })
	//    .catch((err) => {
	//      console.log(err);
	//    });
	//}, []);

	return (
		<BrowserRouter>
			<ErrorBoundary FallbackComponent={ErrorPage} onError={console.log}>
				<QueryClientProvider client={queryClient}>
					<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
						<Toaster />
						<MantineProvider defaultColorScheme="auto">
							{children}
						</MantineProvider>
						{envs.DEV && <ReactQueryDevtools initialIsOpen={false} />}
					</ThemeProvider>
				</QueryClientProvider>
			</ErrorBoundary>
		</BrowserRouter>
	);
};

export { Provider };
