import { Route, Routes } from "react-router";
import { SignIn } from "./pages/auth/sign-in";
import { AuthLayout } from "./pages/layouts/auth-layout";

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<AuthLayout />}>
				<Route path="/" element={<SignIn />} />
			</Route>
		</Routes>
	);
};
