import { Calendar } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export const OverviewPage = () => {
	const [selectedMonth, setSelectedMonth] = useState<string>("10");

	const months = [
		{ value: "1", label: "Janeiro 2025" },
		{ value: "2", label: "Fevereiro 2025" },
		{ value: "3", label: "Março 2025" },
		{ value: "4", label: "Abril 2025" },
		{ value: "5", label: "Maio 2025" },
		{ value: "6", label: "Junho 2025" },
		{ value: "7", label: "Julho 2025" },
		{ value: "8", label: "Agosto 2025" },
		{ value: "9", label: "Setembro 2025" },
		{ value: "10", label: "Outubro 2025" },
		{ value: "11", label: "Novembro 2025" },
		{ value: "12", label: "Dezembro 2025" },
	];

	return (
		<div className="h-full space-y-6 mb-10">
			{/* Header */}
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="space-y-1">
						<h2 className="text-2xl font-semibold">Visão Geral</h2>
						<p className="text-sm text-muted-foreground">
							Acompanhe suas despesas e faturas
						</p>
					</div>
					<Select value={selectedMonth} onValueChange={setSelectedMonth}>
						<SelectTrigger className="w-[200px]">
							<Calendar className="w-4 h-4 mr-2" />
							<SelectValue placeholder="Selecione o mês" />
						</SelectTrigger>
						<SelectContent>
							{months.map((month) => (
								<SelectItem key={month.value} value={month.value}>
									{month.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* Summary Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Card className="border-border/50">
					<CardContent>
						<div className="space-y-1">
							<p className="text-sm text-muted-foreground">Total da Fatura</p>
							<p className="text-3xl font-bold">R$ 1.250,00</p>
						</div>
					</CardContent>
				</Card>

				<Card className="border-border/50">
					<CardContent>
						<div className="space-y-1">
							<p className="text-sm text-muted-foreground">Minhas Despesas</p>
							<p className="text-3xl font-bold">R$ 850,00</p>
						</div>
					</CardContent>
				</Card>

				<Card className="border-border/50">
					<CardContent>
						<div className="space-y-1">
							<p className="text-sm text-muted-foreground">
								Despesas de Outros
							</p>
							<p className="text-3xl font-bold">R$ 400,00</p>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Expenses Table */}
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-semibold">Despesas do Mês</h3>
					<Badge variant="secondary">
						{months.find((m) => m.value === selectedMonth)?.label}
					</Badge>
				</div>

				<Card className="border-border/50">
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								<TableHead>Descrição</TableHead>
								<TableHead>Data</TableHead>
								<TableHead>Categoria</TableHead>
								<TableHead>Responsável</TableHead>
								<TableHead className="text-center">Parcela</TableHead>
								<TableHead className="text-right">Valor</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell className="font-medium">
									Compra Supermercado
								</TableCell>
								<TableCell className="text-muted-foreground">
									15/10/2025
								</TableCell>
								<TableCell>
									<Badge variant="outline" className="text-xs">
										Alimentação
									</Badge>
								</TableCell>
								<TableCell className="text-muted-foreground">
									Yale Henrique
								</TableCell>
								<TableCell className="text-center text-muted-foreground">
									À vista
								</TableCell>
								<TableCell className="text-right font-medium">
									R$ 245,80
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell className="font-medium">Netflix Premium</TableCell>
								<TableCell className="text-muted-foreground">
									10/10/2025
								</TableCell>
								<TableCell>
									<Badge variant="outline" className="text-xs">
										Streaming
									</Badge>
								</TableCell>
								<TableCell className="text-muted-foreground">
									Maria Silva
								</TableCell>
								<TableCell className="text-center text-muted-foreground">
									À vista
								</TableCell>
								<TableCell className="text-right font-medium">
									R$ 55,90
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell className="font-medium">Notebook Dell</TableCell>
								<TableCell className="text-muted-foreground">
									08/10/2025
								</TableCell>
								<TableCell>
									<Badge variant="outline" className="text-xs">
										Eletrônicos
									</Badge>
								</TableCell>
								<TableCell className="text-muted-foreground">
									Yale Henrique
								</TableCell>
								<TableCell className="text-center text-muted-foreground">
									3/12
								</TableCell>
								<TableCell className="text-right font-medium">
									R$ 340,00
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell className="font-medium">
									Restaurante Italiano
								</TableCell>
								<TableCell className="text-muted-foreground">
									05/10/2025
								</TableCell>
								<TableCell>
									<Badge variant="outline" className="text-xs">
										Alimentação
									</Badge>
								</TableCell>
								<TableCell className="text-muted-foreground">
									João Santos
								</TableCell>
								<TableCell className="text-center text-muted-foreground">
									À vista
								</TableCell>
								<TableCell className="text-right font-medium">
									R$ 180,50
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell className="font-medium">Uber</TableCell>
								<TableCell className="text-muted-foreground">
									03/10/2025
								</TableCell>
								<TableCell>
									<Badge variant="outline" className="text-xs">
										Transporte
									</Badge>
								</TableCell>
								<TableCell className="text-muted-foreground">
									Maria Silva
								</TableCell>
								<TableCell className="text-center text-muted-foreground">
									À vista
								</TableCell>
								<TableCell className="text-right font-medium">
									R$ 28,40
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</Card>
			</div>
		</div>
	);
};
