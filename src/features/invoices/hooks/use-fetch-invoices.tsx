import { useQuery } from "@tanstack/react-query";
import { fetchInvoices } from "../api/fetch-invoices";

export const useFetchInvoices = (cardSlug: string) => {
	return useQuery({
		queryKey: ["invoices", cardSlug],
		queryFn: () => fetchInvoices(cardSlug),
		enabled: !!cardSlug,
	});
};
