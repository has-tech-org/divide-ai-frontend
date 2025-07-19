import { BrowserRouter } from "react-router";
import { AppRoutes } from "./routes";
import "./App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { queryClient } from "./lib/react-query";

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<AppRoutes />
			</BrowserRouter>
			<Toaster position="top-right" />
		</QueryClientProvider>
	);
};
