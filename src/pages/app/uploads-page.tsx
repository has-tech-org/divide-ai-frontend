import { Download, FileText, Upload } from "lucide-react";

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

export const UploadsPage = () => {
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
				<Button>
					<Upload className="w-4 h-4" />
					Enviar Fatura
				</Button>
			</div>

			{/* Uploads List */}
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
						<TableRow>
							<TableCell>
								<div className="flex items-center gap-2">
									<FileText className="h-4 w-4 text-muted-foreground" />
									<span className="font-medium">fatura_outubro_2025.pdf</span>
								</div>
							</TableCell>
							<TableCell className="text-muted-foreground">
								15/10/2025
							</TableCell>
							<TableCell className="text-muted-foreground">
								Outubro 2025
							</TableCell>
							<TableCell>
								<Badge variant="default" className="bg-emerald-500">
									Concluído
								</Badge>
							</TableCell>
							<TableCell className="text-right">
								<Button variant="ghost" size="sm">
									<Download className="w-4 h-4" />
								</Button>
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell>
								<div className="flex items-center gap-2">
									<FileText className="h-4 w-4 text-muted-foreground" />
									<span className="font-medium">fatura_setembro_2025.pdf</span>
								</div>
							</TableCell>
							<TableCell className="text-muted-foreground">
								18/09/2025
							</TableCell>
							<TableCell className="text-muted-foreground">
								Setembro 2025
							</TableCell>
							<TableCell>
								<Badge variant="default" className="bg-emerald-500">
									Concluído
								</Badge>
							</TableCell>
							<TableCell className="text-right">
								<Button variant="ghost" size="sm">
									<Download className="w-4 h-4" />
								</Button>
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell>
								<div className="flex items-center gap-2">
									<FileText className="h-4 w-4 text-muted-foreground" />
									<span className="font-medium">fatura_agosto_2025.pdf</span>
								</div>
							</TableCell>
							<TableCell className="text-muted-foreground">
								12/08/2025
							</TableCell>
							<TableCell className="text-muted-foreground">
								Agosto 2025
							</TableCell>
							<TableCell>
								<Badge variant="secondary">Processando</Badge>
							</TableCell>
							<TableCell className="text-right">
								<Button variant="ghost" size="sm">
									<Download className="w-4 h-4" />
								</Button>
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell>
								<div className="flex items-center gap-2">
									<FileText className="h-4 w-4 text-muted-foreground" />
									<span className="font-medium">fatura_julho_2025.pdf</span>
								</div>
							</TableCell>
							<TableCell className="text-muted-foreground">
								15/07/2025
							</TableCell>
							<TableCell className="text-muted-foreground">
								Julho 2025
							</TableCell>
							<TableCell>
								<Badge variant="default" className="bg-emerald-500">
									Concluído
								</Badge>
							</TableCell>
							<TableCell className="text-right">
								<Button variant="ghost" size="sm">
									<Download className="w-4 h-4" />
								</Button>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</Card>
		</div>
	);
};
