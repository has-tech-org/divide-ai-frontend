import { useQuery } from "@tanstack/react-query";
import { fetchAvailableCards } from "../api/fetch-available-cards";

export const useFetchAvailableCards = () => {
	return useQuery({
		queryKey: ["available-cards"],
		queryFn: fetchAvailableCards,
	});
};
