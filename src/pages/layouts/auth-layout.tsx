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
				<Outlet />
			</div>
		</div>
	);
};
