import {
	Car,
	Film,
	GraduationCap,
	Heart,
	MoreHorizontal,
	ShoppingBag,
	Utensils,
} from "lucide-react";

import type { ExpenseCategory } from "@/features/invoices/api/fetch-expenses";
import { cn } from "@/lib/utils";

interface CategoryIconProps {
	category: ExpenseCategory;
	size?: "sm" | "md" | "lg";
	showLabel?: boolean;
	className?: string;
}

const categoryConfig: Record<
	ExpenseCategory,
	{
		icon: React.ComponentType<{ className?: string }>;
		label: string;
		color: string;
		bgColor: string;
	}
> = {
	FOOD: {
		icon: Utensils,
		label: "Alimentação",
		color: "text-orange-600",
		bgColor: "bg-orange-100",
	},
	SHOPPING: {
		icon: ShoppingBag,
		label: "Compras",
		color: "text-blue-600",
		bgColor: "bg-blue-100",
	},
	TRANSPORT: {
		icon: Car,
		label: "Transporte",
		color: "text-green-600",
		bgColor: "bg-green-100",
	},
	ENTERTAINMENT: {
		icon: Film,
		label: "Entretenimento",
		color: "text-purple-600",
		bgColor: "bg-purple-100",
	},
	HEALTH: {
		icon: Heart,
		label: "Saúde",
		color: "text-red-600",
		bgColor: "bg-red-100",
	},
	SERVICES: {
		icon: GraduationCap,
		label: "Serviços",
		color: "text-indigo-600",
		bgColor: "bg-indigo-100",
	},
	OTHER: {
		icon: MoreHorizontal,
		label: "Outros",
		color: "text-gray-600",
		bgColor: "bg-gray-100",
	},
};

const sizeConfig = {
	sm: {
		container: "h-6 w-6",
		icon: "h-3 w-3",
		text: "text-xs",
	},
	md: {
		container: "h-8 w-8",
		icon: "h-4 w-4",
		text: "text-sm",
	},
	lg: {
		container: "h-10 w-10",
		icon: "h-5 w-5",
		text: "text-base",
	},
};

export function CategoryIcon({
	category,
	size = "md",
	showLabel = false,
	className,
}: CategoryIconProps) {
	// Fallback to "OTHER" if category is not found
	const config = categoryConfig[category] || categoryConfig.OTHER;
	const Icon = config.icon;
	const sizeClasses = sizeConfig[size];

	if (showLabel) {
		return (
			<div className={cn("flex items-center gap-2", className)}>
				<div
					className={cn(
						"flex items-center justify-center rounded-md",
						sizeClasses.container,
						config.bgColor,
					)}
				>
					<Icon className={cn(sizeClasses.icon, config.color)} />
				</div>
				<span className={cn("font-medium", sizeClasses.text, config.color)}>
					{config.label}
				</span>
			</div>
		);
	}

	return (
		<div
			className={cn(
				"flex items-center justify-center rounded-md",
				sizeClasses.container,
				config.bgColor,
				className,
			)}
			title={config.label}
		>
			<Icon className={cn(sizeClasses.icon, config.color)} />
		</div>
	);
}

export function getCategoryLabel(category: ExpenseCategory): string {
	return categoryConfig[category]?.label || "Outros";
}
