import { api } from "@/lib/api";

export type ExpenseCategory =
	| "food"
	| "shopping"
	| "transport"
	| "entertainment"
	| "health"
	| "education"
	| "other";

export interface Expense {
	id: string;
	description: string;
	amount: number;
	date: string;
	category: ExpenseCategory;
	isUserExpense: boolean;
}

export interface ExpensesSummary {
	totalInvoice: number;
	totalUser: number;
	totalOthers: number;
}

export interface FetchInvoiceExpensesResponse {
	expenses: Expense[];
	summary: ExpensesSummary;
}

export const fetchInvoiceExpenses = async (
	invoiceId: string,
): Promise<FetchInvoiceExpensesResponse> => {
	const response = await api.get<FetchInvoiceExpensesResponse>(
		`/invoices/${invoiceId}/expenses`,
	);
	return response.data;
};
