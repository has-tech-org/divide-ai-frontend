import { useQuery } from "@tanstack/react-query";
import { fetchCards } from "../api/fetch-cards";

export const useFetchCards = () => {
	return useQuery({
		queryKey: ["cards"],
		queryFn: fetchCards,
		select: (data) => {
			const { cards } = data;

			// Separate cards by role
			const adminCards = cards.filter((card) => card.role === "ADMIN");
			const dependentCards = cards.filter((card) => card.role === "DEPENDENT");

			return {
				adminCards,
				dependentCards,
				allCards: cards,
				totalCards: cards.length,
				totalAdminCards: adminCards.length,
				totalDependentCards: dependentCards.length,
			};
		},
	});
};
