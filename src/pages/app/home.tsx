import { TrendingUp } from "lucide-react";
import { ChartAreaInteractive } from "@/components/home-chart";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export const Home = () => {
	return (
		<div className="h-full space-y-4 mb-10">
			<div className="flex items-center gap-4 py-4 border-b border-zinc-800">
				<SidebarTrigger />

				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbPage>divide.aí</BreadcrumbPage>
						</BreadcrumbItem>

						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Home</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="font-normal">Despesas totais</CardTitle>

							<TrendingUp className="w-4 h-4" />
						</div>
						<strong className="text-3xl font-semibold">R$1.250,00</strong>
					</CardHeader>
					<CardFooter>
						<CardDescription>
							Cartão de crédito selecionado: Nubank
						</CardDescription>
					</CardFooter>
				</Card>

				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="font-normal">
								Usuário mais gastador
							</CardTitle>

							<TrendingUp className="w-4 h-4" />
						</div>
						<strong className="text-3xl font-semibold">R$100,00</strong>
					</CardHeader>
					<CardFooter>
						<CardDescription>
							Yale Henrique foi o maior gastador neste mês
						</CardDescription>
					</CardFooter>
				</Card>

				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="font-normal">Total de compras</CardTitle>

							<TrendingUp className="w-4 h-4" />
						</div>
						<strong className="text-3xl font-semibold">77</strong>
					</CardHeader>
					<CardFooter>
						<CardDescription>
							Total de compras realizadas no cartão de crédito neste mês
						</CardDescription>
					</CardFooter>
				</Card>

				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="font-normal">
								Usuários participantes
							</CardTitle>

							<TrendingUp className="w-4 h-4" />
						</div>
						<strong className="text-3xl font-semibold">10</strong>
					</CardHeader>
					<CardFooter>
						<CardDescription>
							Número de usuários que utilizaram o cartão de crédito neste mês
						</CardDescription>
					</CardFooter>
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
