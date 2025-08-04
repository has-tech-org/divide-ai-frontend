import { Route, Routes } from "react-router";
import { CardPage } from "./pages/app/card-page";
import { Home } from "./pages/app/home-page";
import { SignIn } from "./pages/auth/sign-in";
import { SignUp } from "./pages/auth/sign-up";
import { AppLayout } from "./pages/layouts/app-layout";
import { AuthLayout } from "./pages/layouts/auth-layout";

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<AuthLayout />}>
				<Route index element={<SignIn />} />
				<Route path="/primeiro-acesso" element={<SignUp />} />
			</Route>

			<Route path="/app" element={<AppLayout />}>
				<Route index element={<Home />} />
				<Route path="/app/:cardSlug/overview" element={<CardPage />} />
			</Route>
		</Routes>
	);
};
