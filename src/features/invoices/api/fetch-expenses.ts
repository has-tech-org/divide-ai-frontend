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
	installmentNumber: number | null;
	totalInstallments: number | null;
	owner: {
		id: string;
		name: string;
		role: "ADMIN" | "DEPENDENT";
	};
}

export interface FetchExpensesResponse {
	expenses: Expense[];
}

export interface FetchExpensesParams {
	cardSlug: string;
	month: string; // Format: YYYY-MM
	filter?: "all" | "mine"; // Default: 'all'
}

export const fetchExpenses = async ({
	cardSlug,
	month,
	filter = "all",
}: FetchExpensesParams): Promise<FetchExpensesResponse> => {
	const response = await api.get<FetchExpensesResponse>("/invoices/expenses", {
		params: {
			cardSlug,
			month,
			filter,
		},
	});
	return response.data;
};
