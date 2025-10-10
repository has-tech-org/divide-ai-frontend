import { api } from "@/lib/api";

export type ExpenseCategory =
	| "FOOD"
	| "SHOPPING"
	| "TRANSPORT"
	| "ENTERTAINMENT"
	| "HEALTH"
	| "SERVICES"
	| "OTHER";

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

export interface PaginationInfo {
	page: number;
	limit: number;
	total: number;
	pages: number;
}

export interface FetchExpensesResponse {
	expenses: Expense[];
	pagination: PaginationInfo;
}

export interface FetchExpensesParams {
	cardSlug: string;
	month: string; // Format: YYYY-MM
	filter?: "all" | "mine"; // Default: 'all'
	category?: ExpenseCategory; // Filter by category
	search?: string; // Search by description
	page?: number; // Page number (default: 1)
	limit?: number; // Items per page (default: 10, max: 100)
}

export const fetchExpenses = async ({
	cardSlug,
	month,
	filter = "all",
	category,
	search,
	page = 1,
	limit = 10,
}: FetchExpensesParams): Promise<FetchExpensesResponse> => {
	const params: Record<string, string | number> = {
		cardSlug,
		month,
		filter,
		page,
		limit,
	};

	// Only include category and search if they have values
	if (category) {
		params.category = category;
	}
	if (search) {
		params.search = search;
	}

	const response = await api.get<FetchExpensesResponse>("/invoices/expenses", {
		params,
	});
	return response.data;
};
