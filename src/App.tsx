import { BrowserRouter } from "react-router";
import { AppRoutes } from "./routes";
import "./App.css";

export const App = () => {
	return (
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	);
};
