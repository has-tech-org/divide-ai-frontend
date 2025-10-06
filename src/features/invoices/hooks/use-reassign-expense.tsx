import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	reassignExpense,
	type ReassignExpenseRequest,
} from "../api/reassign-expense";
import { toast } from "sonner";

export const useReassignExpense = (cardSlug: string, month: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			expenseId,
			data,
		}: {
			expenseId: string;
			data: ReassignExpenseRequest;
		}) => reassignExpense(expenseId, data),
		onSuccess: () => {
			toast.success("Despesa reatribuída com sucesso!");
			// Invalidate expenses queries to refresh the data
			queryClient.invalidateQueries({
				queryKey: ["expenses", cardSlug, month],
			});
			queryClient.invalidateQueries({
				queryKey: ["invoice-summary", cardSlug, month],
			});
		},
		onError: (error: Error) => {
			toast.error("Erro ao reatribuir despesa", {
				description: error.message,
			});
		},
	});
};
