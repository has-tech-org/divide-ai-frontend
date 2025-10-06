import { useQuery } from "@tanstack/react-query";
import { fetchInvoiceExpenses } from "../api/fetch-invoice-expenses";

export const useFetchInvoiceExpenses = (invoiceId: string) => {
	return useQuery({
		queryKey: ["invoice-expenses", invoiceId],
		queryFn: () => fetchInvoiceExpenses(invoiceId),
		enabled: !!invoiceId,
	});
};
