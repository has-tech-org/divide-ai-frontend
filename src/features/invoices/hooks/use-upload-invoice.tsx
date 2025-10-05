import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadInvoice } from "../api/upload-invoice";

export const useUploadInvoice = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: uploadInvoice,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["invoices"] });
		},
	});
};
