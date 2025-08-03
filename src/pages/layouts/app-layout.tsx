import { isAxiosError } from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { Header } from "@/components/header";
import { Navbar } from "@/components/navbar";
import { api } from "@/lib/api";

export const AppLayout = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const interceptorId = api.interceptors.response.use(
			(response) => response,
			(error) => {
				if (isAxiosError(error)) {
					if (error.status === 401) {
						navigate("/");
					}
				}
			},
		);

		return () => {
			api.interceptors.response.eject(interceptorId);
		};
	}, [navigate]);

	return (
		<div className="h-svh bg-zinc-900">
			<Header />
			<Navbar />
			<main className="max-w-7xl w-full mx-auto relative px-4 my-8">
				<Outlet />
			</main>
		</div>
	);
};
