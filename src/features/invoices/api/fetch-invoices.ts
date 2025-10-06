import { api } from "@/lib/api";

export interface Invoice {
	id: string;
	amount: number;
	dueDate: string;
	referenceMonth: string;
	status: "PENDING" | "PROCESSING" | "COMPLETED" | "ERROR" | "PAID";
	fileUrl: string;
}

export interface FetchInvoicesResponse {
	invoices: Invoice[];
}

export const fetchInvoices = async (
	cardSlug: string,
): Promise<FetchInvoicesResponse> => {
	const response = await api.get<FetchInvoicesResponse>("/invoices", {
		params: {
			cardSlug,
		},
	});
	return response.data;
};
