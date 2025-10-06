import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
	className?: string;
}

export function Logo({ className }: LogoProps) {
	return (
		<div className="flex items-center gap-2">
			<TrendingUp className="w-5 h-5" />
			<span className={cn("text-xl font-semibold tracking-tight", className)}>
				fatia
				<span className="text-amber-500">-app</span>{" "}
				<span className="text-xs text-muted-foreground font-normal">
					{" "}
					v0.0.1
				</span>
			</span>
		</div>
	);
}
