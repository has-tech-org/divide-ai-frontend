import { Download, FileText, Loader, Upload } from "lucide-react";
import { useParams } from "react-router";

import { AddNewInvoiceDialog } from "@/components/add-new-invoice-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useFetchInvoices } from "@/features/invoices/hooks/use-fetch-invoices";

type Params = {
	cardSlug: string;
};

const statusMap = {
	PENDING: { label: "Pendente", variant: "secondary" as const },
	PROCESSING: { label: "Processando", variant: "secondary" as const },
	COMPLETED: {
		label: "Concluído",
		variant: "default" as const,
		className: "bg-emerald-500",
	},
	ERROR: { label: "Erro", variant: "destructive" as const },
};

export const UploadsPage = () => {
	const { cardSlug } = useParams<Params>();
	const { data, isLoading } = useFetchInvoices(cardSlug || "");

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("pt-BR");
	};

	const formatReferenceMonth = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("pt-BR", {
			month: "long",
			year: "numeric",
		});
	};

	return (
		<div className="h-full space-y-6 mb-10">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="space-y-1">
					<h2 className="text-2xl font-semibold">Faturas</h2>
					<p className="text-sm text-muted-foreground">
						Gerencie os uploads das suas faturas
					</p>
				</div>
				<AddNewInvoiceDialog>
					<Button size="default" variant="secondary">
						<Upload className="w-4 h-4" />
						Enviar Fatura
					</Button>
				</AddNewInvoiceDialog>
			</div>

			{/* Uploads List */}
			{isLoading ? (
				<div className="flex items-center justify-center py-12">
					<Loader className="w-6 h-6 animate-spin" />
				</div>
			) : !data?.invoices || data.invoices.length === 0 ? (
				<div className="text-center py-12 space-y-3">
					<FileText className="w-12 h-12 mx-auto text-muted-foreground/50" />
					<div className="space-y-1">
						<p className="text-lg font-medium">Nenhuma fatura enviada</p>
						<p className="text-sm text-muted-foreground">
							Comece enviando sua primeira fatura
						</p>
					</div>
				</div>
			) : (
				<Card className="border-border/50">
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								<TableHead>Arquivo</TableHead>
								<TableHead>Data de Upload</TableHead>
								<TableHead>Mês Referência</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right">Ações</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.invoices.map((invoice) => {
								const status = statusMap[invoice.status];
								return (
									<TableRow key={invoice.id}>
										<TableCell>
											<div className="flex items-center gap-2">
												<FileText className="h-4 w-4 text-muted-foreground" />
												<span className="font-medium">
													fatura_
													{formatReferenceMonth(invoice.referenceMonth).replace(
														" ",
														"_",
													)}
													.pdf
												</span>
											</div>
										</TableCell>
										<TableCell className="text-muted-foreground">
											{formatDate(invoice.createdAt)}
										</TableCell>
										<TableCell className="text-muted-foreground">
											{formatReferenceMonth(invoice.referenceMonth)}
										</TableCell>
										<TableCell>
											<Badge variant={status.variant}>{status.label}</Badge>
										</TableCell>
										<TableCell className="text-right">
											<Button
												variant="ghost"
												size="sm"
												onClick={() => window.open(invoice.fileUrl, "_blank")}
											>
												<Download className="w-4 h-4" />
											</Button>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</Card>
			)}
		</div>
	);
};
