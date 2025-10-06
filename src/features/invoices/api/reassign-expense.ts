import { api } from "@/lib/api";

export interface ReassignExpenseRequest {
	newOwnerId: string;
}

export interface ReassignExpenseResponse {
	expense: {
		id: string;
		description: string;
		amount: number;
		cardUserId: string;
	};
}

export const reassignExpense = async (
	expenseId: string,
	data: ReassignExpenseRequest,
): Promise<ReassignExpenseResponse> => {
	const response = await api.patch<ReassignExpenseResponse>(
		`/expenses/${expenseId}/owner`,
		data,
	);
	return response.data;
};
