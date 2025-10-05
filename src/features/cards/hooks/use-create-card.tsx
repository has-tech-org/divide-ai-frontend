import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCard } from "../api/create-card";

export const useCreateCard = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createCard,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cards"] });
		},
	});
};
