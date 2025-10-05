import { CreditCard, Crown, Users } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useFetchCards } from "@/features/cards/hooks/use-fetch-cards";

export const HomePage = () => {
	const { data } = useFetchCards();

	const Role = {
		ADMIN: "Titular",
		DEPENDENT: "Membro",
	} as const;

	const summaryCards = [
		{
			title: "Total de Cartões",
			value: data?.totalCards || 0,
			icon: CreditCard,
			description: "Cartões cadastrados",
		},
		{
			title: "Como Titular",
			value: data?.totalAdminCards || 0,
			icon: Crown,
			description: "Você é o titular",
		},
		{
			title: "Como Membro",
			value: data?.totalDependentCards || 0,
			icon: Users,
			description: "Você é membro",
		},
	];

	return (
		<div className="h-full space-y-8 mb-10">
			{/* Summary Section */}
			<div className="space-y-4">
				<h3 className="text-lg font-semibold px-1">Resumo</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{summaryCards.map((card) => {
						const Icon = card.icon;
						return (
							<div
								key={card.title}
								className="flex items-center gap-4 rounded-lg border border-border/50 bg-muted/30 p-4 transition-colors hover:bg-muted/50"
							>
								<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary/10">
									<Icon className="h-6 w-6 text-primary" />
								</div>
								<div className="flex-1 space-y-1">
									<p className="text-sm font-medium text-muted-foreground">
										{card.title}
									</p>
									<p className="text-2xl font-bold">{card.value}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* Cards Section */}
			<div className="space-y-4">
				<h3 className="text-lg font-semibold px-1">Cartões Disponíveis</h3>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{data?.allCards?.map((card) => (
						<Link to={`/app/${card.slug}/overview`} key={card.id}>
							<Card className="relative overflow-hidden aspect-video group border-border/50 hover:border-border transition-all duration-200 hover:shadow-md">
								<CardContent className="flex flex-col justify-between h-full p-6">
									{/* Top Section */}
									<div className="flex justify-between items-start">
										<div className="space-y-1">
											<Badge
												variant="secondary"
												className="text-xs font-normal"
											>
												{Role[card.role]}
											</Badge>
										</div>
										<div className="w-12 h-8 bg-gradient-to-br from-amber-200 to-yellow-300 rounded-md flex items-center justify-center shadow-sm">
											<div className="w-10 h-6 bg-gradient-to-br from-amber-300 to-yellow-400 rounded-sm" />
										</div>
									</div>

									{/* Middle Section - Card Number */}
									<div className="flex items-center justify-center flex-1 py-2">
										<span className="text-lg font-mono tracking-[0.3em] text-foreground/80">
											•••• {card.last_digits}
										</span>
									</div>

									{/* Bottom Section */}
									<div className="flex justify-between items-end">
										<span className="text-base font-semibold truncate pr-2">
											{card.name}
										</span>
										{card.is_active ? (
											<span className="text-xs font-medium text-emerald-500">
												Ativo
											</span>
										) : (
											<span className="text-xs font-medium text-muted-foreground">
												Inativo
											</span>
										)}
									</div>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};
