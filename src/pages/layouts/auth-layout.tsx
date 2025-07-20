import { Outlet } from "react-router";
import imageBanner from "@/assets/auth-banner.jpg";
import { Logo } from "@/components/ui/logo";

export const AuthLayout = () => {
	return (
		<div className="flex justify-center h-screen bg-zinc-900">
			<div className="flex-1 hidden xl:block">
				<img
					src={imageBanner}
					alt="logo"
					className="w-full h-full object-cover"
				/>
			</div>
			<div className="max-w-2xl w-full">
				<div className="max-w-lg px-4 w-full mx-auto flex flex-col justify-center items-center h-full gap-10">
					<Outlet />
					<footer className="flex flex-col items-center">
						<Logo />

						<p className="text-center text-sm text-muted-foreground">
							Gerencie suas contas de cartão de crédito.
						</p>
					</footer>
				</div>
			</div>
		</div>
	);
};
