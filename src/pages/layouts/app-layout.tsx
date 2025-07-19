import { Outlet } from "react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export const AppLayout = () => {
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
