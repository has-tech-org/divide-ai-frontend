import { Upload, WalletIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { FileUploader } from "./file-uploader";

export function AddNewInvoiceDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default" size="icon">
					<Upload className="w-4 h-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<div className="flex flex-col gap-2">
					<div
						className="flex size-11 shrink-0 items-center justify-center rounded-full border"
						aria-hidden="true"
					>
						<WalletIcon className="opacity-80" size={16} />
					</div>
					<DialogHeader>
						<DialogTitle className="text-left">
							Adicionar nova fatura
						</DialogTitle>
						<DialogDescription className="text-left">
							Adicione uma nova fatura de cartão.
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-4">
						<FileUploader />

						<Button className="w-full">Salvar fatura</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
