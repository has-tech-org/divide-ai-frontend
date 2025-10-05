import { api } from "@/lib/api";

export interface UploadInvoiceRequest {
	file: File;
	cardSlug: string;
}

export interface UploadInvoiceResponse {
	invoice: {
		id: string;
		amount: number;
		dueDate: string;
		referenceMonth: string;
		status: "PENDING" | "PROCESSING" | "COMPLETED" | "ERROR";
		fileUrl: string;
	};
}

export const uploadInvoice = async ({
	file,
	cardSlug,
}: UploadInvoiceRequest): Promise<UploadInvoiceResponse> => {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("cardSlug", cardSlug);

	const response = await api.post<UploadInvoiceResponse>(
		"/invoices",
		formData,
		{
			headers: {
				"Content-Type": "multipart/form-data",
			},
		},
	);

	return response.data;
};
