import { Outlet } from "react-router";
import imageBanner from "@/assets/auth-banner.jpg";

export const AuthLayout = () => {
	return (
		<div className="flex h-screen bg-zinc-900">
			<div className="max-w-3xl 2xl:max-w-6xl w-full h-full">
				<img
					src={imageBanner}
					alt="logo"
					className="w-full h-full object-cover"
				/>
			</div>
			<div className="flex-1">
				<div className="max-w-lg px-4 w-full mx-auto flex flex-col justify-center items-center h-full gap-10">
					<Outlet />
					<footer>
						<span className="text-center text-lg text-amber-50 block">
							divideai.app
						</span>

						<p className="text-center text-sm text-muted-foreground">
							Gerencie suas contas de cartão de crédito.
						</p>
					</footer>
				</div>
			</div>
		</div>
	);
};
