import { useQuery } from "@tanstack/react-query";
import { fetchExpenses, type FetchExpensesParams } from "../api/fetch-expenses";

export const useFetchExpenses = (params: FetchExpensesParams) => {
	return useQuery({
		queryKey: [
			"expenses",
			params.cardSlug,
			params.month,
			params.filter || "all",
			params.category,
			params.search,
			params.page,
			params.limit,
		],
		queryFn: () => fetchExpenses(params),
		enabled: !!params.cardSlug && !!params.month,
		// Keep previous data while fetching new data for smooth transitions
		placeholderData: (previousData) => previousData,
		// Cache data for 5 minutes
		staleTime: 5 * 60 * 1000,
		// Keep unused data in cache for 10 minutes
		gcTime: 10 * 60 * 1000,
	});
};
