import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { useFetchCards } from "@/features/cards/hooks/use-fetch-cards";

export const HomePage = () => {
	const { data } = useFetchCards();

	const Role = {
		ADMIN: "Administrador",
		DEPENDENT: "Dependente",
	} as const;

	return (
		<div className="h-full space-y-4 mb-10">
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
				<div className="col-span-1 rounded-lg space-y-4">
					<h3 className="text-lg font-semibold px-1.5">Resumo</h3>

					<Card>
						<CardContent>
							<ul className="space-y-4">
								<li className="flex items-baseline justify-between gap-1">
									<p className="text-sm text-gray-200">Cartões associados</p>
									<span className="text-sm text-gray-400">
										{data?.totalCards}
									</span>
								</li>

								<li className="flex items-baseline justify-between gap-1">
									<p className="text-sm text-gray-200">
										Cartões como administrador
									</p>
									<span className="text-sm text-gray-400">
										{data?.totalAdminCards}
									</span>
								</li>
							</ul>
						</CardContent>
					</Card>
				</div>

				<div className="col-span-3">
					<h3 className="text-lg font-semibold px-1.5 mb-4">
						Cartões disponíveis
					</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{data?.allCards?.map((card) => (
							<Link to={`/app/${card.slug}/overview`} key={card.id}>
								<Card className="relative overflow-hidden aspect-video group rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl p-0">
									<CardContent className="relative z-10 flex flex-col justify-between h-full p-6 text-white">
										<div className="flex justify-between items-center">
											<span className="text-xs font-light uppercase tracking-wider">
												{card.bank}
											</span>
											<div className="w-10 h-6 bg-yellow-400 rounded-sm flex items-center justify-center">
												<div className="w-8 h-4 bg-yellow-500 rounded-xs" />
											</div>
										</div>

										<span className="text-xs font-light uppercase tracking-wider text-yellow-300">
											Cartão de {Role[card.role]}
										</span>

										<div className="flex justify-center items-center h-full">
											<span className="text-lg font-mono tracking-widest">
												**** **** **** {card.last_digits}
											</span>
										</div>

										<div className="flex justify-between items-end">
											<span className="text-lg font-semibold">{card.name}</span>
											<span className="text-xs font-light uppercase tracking-wider">
												{card.flag}
											</span>
										</div>
									</CardContent>
								</Card>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
