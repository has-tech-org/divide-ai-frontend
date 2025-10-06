import { api } from "@/lib/api";

export interface InvoiceSummary {
	invoiceId: string;
	totalInvoice: number;
	totalUser: number;
	totalOthers: number;
	dueDate: string;
	referenceMonth: string;
	status: "PENDING" | "PROCESSING" | "COMPLETED" | "ERROR";
}

export interface FetchInvoiceSummaryResponse {
	summary: InvoiceSummary;
}

export interface FetchInvoiceSummaryParams {
	cardSlug: string;
	month: string; // Format: YYYY-MM
}

export const fetchInvoiceSummary = async ({
	cardSlug,
	month,
}: FetchInvoiceSummaryParams): Promise<FetchInvoiceSummaryResponse> => {
	const response = await api.get<FetchInvoiceSummaryResponse>(
		"/invoices/summary",
		{
			params: {
				cardSlug,
				month,
			},
		},
	);
	return response.data;
};
