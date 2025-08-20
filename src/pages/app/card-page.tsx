import { Tag, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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

export const CardPage = () => {
	return (
		<div className="h-full space-y-4 mb-10">
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="font-normal text-sm text-gray-400">
								Última fatura
							</CardTitle>

							<p className="flex items-center gap-1 text-xs bg-emerald-300/10 text-emerald-500 px-1.5 py-1 rounded-sm">
								<TrendingUp className="w-3 h-3" />
								50.46%
							</p>
						</div>
						<strong className="text-3xl font-semibold">R$1.250,00</strong>
					</CardHeader>
				</Card>

				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="font-normal text-sm text-gray-400">
								Minhas compras
							</CardTitle>

							<p className="flex items-center gap-1 text-xs bg-emerald-300/10 text-emerald-500 px-1.5 py-1 rounded-sm">
								<TrendingUp className="w-3 h-3" />
								50.46%
							</p>
						</div>
						<strong className="text-3xl font-semibold">R$100,00</strong>
					</CardHeader>
				</Card>

				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="font-normal text-sm text-gray-400">
								Mais longa parcela
							</CardTitle>

							<p className="flex items-center gap-1 text-xs bg-amber-300/10 text-amber-500 px-1.5 py-1 rounded-sm">
								<Tag className="w-3 h-3" />
								6/12
							</p>
						</div>
						<strong className="text-3xl font-semibold">R$100,00</strong>
					</CardHeader>
				</Card>

				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="font-normal text-sm text-gray-400">
								Maior parcela
							</CardTitle>

							<p className="flex items-center gap-1 text-xs bg-amber-300/10 text-amber-500 px-1.5 py-1 rounded-sm">
								<Tag className="w-3 h-3" />
								6/12
							</p>
						</div>
						<strong className="text-3xl font-semibold">R$100,00</strong>
					</CardHeader>
				</Card>
			</div>

			<header className="flex items-center justify-between px-8">
				<h2 className="text-2xl font-semibold">Faturas</h2>
				<div className="flex items-center gap-2">
					<Select>
						<SelectTrigger>
							<SelectValue placeholder="Selecione uma fatura" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="1">Janeiro</SelectItem>
							<SelectItem value="2">Fevereiro</SelectItem>
							<SelectItem value="3">Março</SelectItem>
							<SelectItem value="4">Abril</SelectItem>
							<SelectItem value="5">Maio</SelectItem>
							<SelectItem value="6">Junho</SelectItem>
							<SelectItem value="7">Julho</SelectItem>
							<SelectItem value="8">Agosto</SelectItem>
							<SelectItem value="9">Setembro</SelectItem>
							<SelectItem value="10">Outubro</SelectItem>
							<SelectItem value="11">Novembro</SelectItem>
							<SelectItem value="12">Dezembro</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</header>

			<div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="text-center">Produto</TableHead>
							<TableHead className="text-center">Valor</TableHead>
							<TableHead className="text-center">Data</TableHead>
							<TableHead className="text-center">Parcela</TableHead>
							<TableHead className="text-center">Categoria</TableHead>
							<TableHead className="text-center">Responsável</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell className="text-center">Produto 1</TableCell>
							<TableCell className="text-center">R$100,00</TableCell>
							<TableCell className="text-center">2025-01-01</TableCell>
							<TableCell className="text-center">1/2</TableCell>
							<TableCell className="text-center">Alimentação</TableCell>
							<TableCell className="text-center">Yale Henrique</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className="text-center">Produto 1</TableCell>
							<TableCell className="text-center">R$100,00</TableCell>
							<TableCell className="text-center">2025-01-01</TableCell>
							<TableCell className="text-center">1/2</TableCell>
							<TableCell className="text-center">Alimentação</TableCell>
							<TableCell className="text-center">Yale Henrique</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className="text-center">Produto 1</TableCell>
							<TableCell className="text-center">R$100,00</TableCell>
							<TableCell className="text-center">2025-01-01</TableCell>
							<TableCell className="text-center">1/2</TableCell>
							<TableCell className="text-center">Alimentação</TableCell>
							<TableCell className="text-center">Yale Henrique</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className="text-center">Produto 1</TableCell>
							<TableCell className="text-center">R$100,00</TableCell>
							<TableCell className="text-center">2025-01-01</TableCell>
							<TableCell className="text-center">1/2</TableCell>
							<TableCell className="text-center">Alimentação</TableCell>
							<TableCell className="text-center">Yale Henrique</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</div>
	);
};
