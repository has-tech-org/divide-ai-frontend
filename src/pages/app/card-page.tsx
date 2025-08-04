import { TrendingDown, TrendingUp } from "lucide-react";
import { ChartAreaInteractive } from "@/components/home-chart";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
								Despesas totais
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
								Usuário mais gastador
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
							<CardTitle className="font-normal text-sm">
								Total de compras
							</CardTitle>

							<p className="flex items-center gap-1 text-xs bg-emerald-300/10 text-emerald-500 px-1.5 py-1 rounded-sm">
								<TrendingUp className="w-3 h-3" />
								10%
							</p>
						</div>
						<strong className="text-3xl font-semibold">77</strong>
					</CardHeader>
				</Card>

				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="font-normal text-sm">
								Usuários participantes
							</CardTitle>

							<p className="flex items-center gap-1 text-xs bg-rose-300/10 text-rose-500 px-1.5 py-1 rounded-sm">
								<TrendingDown className="w-3 h-3" />
								10%
							</p>
						</div>
						<strong className="text-3xl font-semibold">10</strong>
					</CardHeader>
				</Card>
			</div>

			<ChartAreaInteractive />

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
