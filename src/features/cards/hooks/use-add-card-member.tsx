import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCardMember, type AddCardMemberRequest } from "../api/add-card-member";
import { toast } from "sonner";

export const useAddCardMember = (cardSlug: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: AddCardMemberRequest) => addCardMember(cardSlug, data),
		onSuccess: () => {
			toast.success("Membro adicionado com sucesso!");
			// Invalidate card query to update members count
			queryClient.invalidateQueries({ queryKey: ["card", cardSlug] });
		},
		onError: (error: Error) => {
			toast.error("Erro ao adicionar membro", {
				description: error.message,
			});
		},
	});
};
