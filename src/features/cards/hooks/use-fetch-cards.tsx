import { useQuery } from "@tanstack/react-query";
import { fetchCards } from "../api/fetch-available-cards";

export const useFetchCards = () => {
	return useQuery({
		queryKey: ["cards"],
		queryFn: fetchCards,
	});
};
