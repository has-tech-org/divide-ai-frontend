import { Outlet } from "react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const AppLayout = () => {
	return (
		<div className="flex h-screen bg-zinc-900">
			<SidebarProvider>
				<AppSidebar />
				<main className="flex-1 max-w-7xl w-full mx-auto relative">
					{/* Sidebar toggle button fixed to bottom-left corner for consistent positioning */}
					<SidebarTrigger className="fixed left-4 bottom-4 z-50 md:left-6 md:bottom-6" />
					<Outlet />
				</main>
			</SidebarProvider>
		</div>
	);
};
