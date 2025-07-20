import { isAxiosError } from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
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
		<div className="flex h-full bg-zinc-900">
			<SidebarProvider>
				<AppSidebar />
				<main className="flex-1 max-w-7xl w-full mx-auto relative px-4">
					<Outlet />
				</main>
			</SidebarProvider>
		</div>
	);
};
