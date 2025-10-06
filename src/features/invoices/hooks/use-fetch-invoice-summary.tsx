import { useQuery } from "@tanstack/react-query";
import {
	fetchInvoiceSummary,
	type FetchInvoiceSummaryParams,
} from "../api/fetch-invoice-summary";

export const useFetchInvoiceSummary = (params: FetchInvoiceSummaryParams) => {
	return useQuery({
		queryKey: ["invoice-summary", params.cardSlug, params.month],
		queryFn: () => fetchInvoiceSummary(params),
		enabled: !!params.cardSlug && !!params.month,
	});
};
