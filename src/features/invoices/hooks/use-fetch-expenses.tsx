import { useQuery } from "@tanstack/react-query";
import { fetchExpenses, type FetchExpensesParams } from "../api/fetch-expenses";

export const useFetchExpenses = (params: FetchExpensesParams) => {
	return useQuery({
		queryKey: [
			"expenses",
			params.cardSlug,
			params.month,
			params.filter || "all",
		],
		queryFn: () => fetchExpenses(params),
		enabled: !!params.cardSlug && !!params.month,
	});
};
