import { useQuery } from "@tanstack/react-query";
import { fetchCardMembers } from "../api/fetch-card-members";

export const useFetchCardMembers = (cardSlug: string) => {
	return useQuery({
		queryKey: ["card-members", cardSlug],
		queryFn: () => fetchCardMembers(cardSlug),
		enabled: !!cardSlug,
	});
};
