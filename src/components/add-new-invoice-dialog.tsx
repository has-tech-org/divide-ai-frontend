import { isAxiosError } from "axios";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useUploadInvoice } from "@/features/invoices/hooks/use-upload-invoice";
import { useFileUpload } from "@/hooks/use-file-upload";
import { FileUploader } from "./file-uploader";

type Params = {
	cardSlug: string;
};

interface AddNewInvoiceDialogProps {
	children: React.ReactNode;
}

export function AddNewInvoiceDialog({ children }: AddNewInvoiceDialogProps) {
	const [open, setOpen] = useState(false);
	const { cardSlug } = useParams<Params>();
	const { mutateAsync: uploadInvoice, isPending } = useUploadInvoice();

	const [{ files, isDragging, errors }, actions] = useFileUpload({
		accept: ".pdf",
		maxSize: 10 * 1024 * 1024, // 10MB
		initialFiles: [],
	});

	const [file] = files;

	const handleUpload = async () => {
		if (!file) {
			toast.error("Selecione um arquivo");
			return;
		}

		if (!cardSlug) {
			toast.error("Cartão não identificado");
			return;
		}

		try {
			await uploadInvoice({
				file: file.file as File,
				cardSlug: cardSlug,
			});
			toast.success("Fatura enviada com sucesso!");
			setOpen(false);
			actions.clearFiles();
		} catch (error) {
			if (isAxiosError(error)) {
				if (error.response?.data?.message) {
					return toast.error(error.response.data.message);
				}
			}
			return toast.error("Erro ao enviar fatura");
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Enviar Fatura</DialogTitle>
					<DialogDescription>
						Faça upload da fatura em PDF para processar automaticamente
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					<FileUploader
						files={files}
						isDragging={isDragging}
						errors={errors}
						{...actions}
					/>

					<div className="flex gap-2 pt-4">
						<Button
							type="button"
							variant="outline"
							className="flex-1"
							onClick={() => {
								setOpen(false);
								actions.clearFiles();
							}}
						>
							Cancelar
						</Button>
						<Button
							type="button"
							className="flex-1"
							onClick={handleUpload}
							disabled={files.length === 0 || isPending}
						>
							{isPending ? (
								<Loader className="animate-spin w-4 h-4" />
							) : (
								"Enviar"
							)}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
