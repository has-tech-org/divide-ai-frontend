/** biome-ignore-all lint/correctness/useExhaustiveDependencies: biome is triggering a false positive */
import {
	Calendar,
	CreditCard,
	Loader,
	MoreVertical,
	UserPlus,
	Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { AddMemberDialog } from "@/components/add-member-dialog";
import { CategoryIcon } from "@/components/category-icon";
import { ExpenseDetailSheet } from "@/components/expense-detail-sheet";
import { ExpenseFilters } from "@/components/expense-filters";
import { ExpenseTableSkeleton } from "@/components/expense-table-skeleton";
import { Badge } from "@/components/ui/badge";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CardFlag } from "@/features/cards/api/create-card";
import { useFetchCardBySlug } from "@/features/cards/hooks/use-fetch-card-by-slug";
import type {
	Expense,
	ExpenseCategory,
} from "@/features/invoices/api/fetch-expenses";
import type { Invoice } from "@/features/invoices/api/fetch-invoices";
import { useFetchExpenses } from "@/features/invoices/hooks/use-fetch-expenses";
import { useFetchInvoiceSummary } from "@/features/invoices/hooks/use-fetch-invoice-summary";
import { useFetchInvoices } from "@/features/invoices/hooks/use-fetch-invoices";
import { useDebounce } from "@/hooks/use-debounce";

type Params = {
	cardSlug: string;
};

export const OverviewPage = () => {
	const { cardSlug } = useParams<Params>();
	const { data, isLoading } = useFetchCardBySlug(cardSlug || "");

	// Fetch invoices for the card
	const { data: invoicesData } = useFetchInvoices(cardSlug || "");

	// Auto-select the most recent invoice
	const mostRecentInvoice = invoicesData?.invoices?.[0];
	const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>("");

	// Update selected invoice when data loads
	React.useEffect(() => {
		if (mostRecentInvoice && !selectedInvoiceId) {
			setSelectedInvoiceId(mostRecentInvoice.id);
		}
	}, [mostRecentInvoice, selectedInvoiceId]);

	// Get selected invoice details
	const selectedInvoice = invoicesData?.invoices.find(
		(inv) => inv.id === selectedInvoiceId,
	);

	// Extract month from selected invoice
	const selectedMonth = selectedInvoice
		? (() => {
				const date = new Date(selectedInvoice.referenceMonth);
				return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
			})()
		: "";

	// Fetch invoice summary for selected month
	const { data: summaryData } = useFetchInvoiceSummary({
		cardSlug: cardSlug || "",
		month: selectedMonth,
	});

	// Filter state
	const [myExpensesSearchQuery, setMyExpensesSearchQuery] = useState("");
	const [myExpensesCategory, setMyExpensesCategory] = useState<
		ExpenseCategory | "all"
	>("all");
	const [allExpensesSearchQuery, setAllExpensesSearchQuery] = useState("");
	const [allExpensesCategory, setAllExpensesCategory] = useState<
		ExpenseCategory | "all"
	>("all");

	// Pagination state
	const [myExpensesPage, setMyExpensesPage] = useState(1);
	const [myExpensesPerPage, setMyExpensesPerPage] = useState(10);
	const [allExpensesPage, setAllExpensesPage] = useState(1);
	const [allExpensesPerPage, setAllExpensesPerPage] = useState(10);

	// Debounce search queries to reduce API calls
	const debouncedMyExpensesSearch = useDebounce(myExpensesSearchQuery, 500);
	const debouncedAllExpensesSearch = useDebounce(allExpensesSearchQuery, 500);

	// Fetch all expenses for selected month with server-side filtering
	const { data: allExpensesData, isLoading: isLoadingAllExpenses } =
		useFetchExpenses({
			cardSlug: cardSlug || "",
			month: selectedMonth,
			filter: "all",
			category: allExpensesCategory !== "all" ? allExpensesCategory : undefined,
			search: debouncedAllExpensesSearch || undefined,
			page: allExpensesPage,
			limit: allExpensesPerPage,
		});

	// Fetch my expenses for selected month with server-side filtering
	const { data: myExpensesData, isLoading: isLoadingMyExpenses } =
		useFetchExpenses({
			cardSlug: cardSlug || "",
			month: selectedMonth,
			filter: "mine",
			category: myExpensesCategory !== "all" ? myExpensesCategory : undefined,
			search: debouncedMyExpensesSearch || undefined,
			page: myExpensesPage,
			limit: myExpensesPerPage,
		});

	const formatCurrency = (value: number | null) => {
		if (value === null) return "N/A";
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(value);
	};

	const getCardFlagColor = (flag: CardFlag) => {
		const colors = {
			VISA: "from-blue-500 to-blue-700",
			MASTERCARD: "from-red-500 to-orange-500",
			ELO: "from-yellow-500 to-yellow-600",
			AMEX: "from-blue-400 to-blue-600",
			HIPERCARD: "from-red-600 to-red-700",
			OTHER: "from-gray-500 to-gray-600",
		};
		return colors[flag] || colors.OTHER;
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("pt-BR");
	};

	const formatInvoiceLabel = (invoice: Invoice) => {
		const date = new Date(invoice.referenceMonth);
		const monthName = date.toLocaleDateString("pt-BR", {
			month: "long",
			year: "numeric",
		});
		const capitalizedMonth =
			monthName.charAt(0).toUpperCase() + monthName.slice(1);
		return `${capitalizedMonth}`;
	};

	// Get data from server responses (already filtered and paginated)
	const myExpenses = myExpensesData?.expenses || [];
	const myExpensesPagination = myExpensesData?.pagination || {
		page: 1,
		limit: 10,
		total: 0,
		pages: 0,
	};

	const allExpenses = allExpensesData?.expenses || [];
	const allExpensesPagination = allExpensesData?.pagination || {
		page: 1,
		limit: 10,
		total: 0,
		pages: 0,
	};

	// Reset page when filters change (use debounced values to sync with actual API calls)
	useEffect(() => {
		setMyExpensesPage(1);
	}, [debouncedMyExpensesSearch, myExpensesCategory]);

	useEffect(() => {
		setAllExpensesPage(1);
	}, [debouncedAllExpensesSearch, allExpensesCategory]);

	const renderExpenseRow = (expense: Expense) => (
		<TableRow key={expense.id} className="hover:bg-muted/30 transition-colors">
			<TableCell className="font-medium">{expense.description}</TableCell>
			<TableCell className="text-muted-foreground">
				{formatDate(expense.date)}
			</TableCell>
			<TableCell>
				<CategoryIcon category={expense.category} size="sm" />
			</TableCell>
			<TableCell className="text-muted-foreground">
				{expense.owner.name}
			</TableCell>
			<TableCell className="text-center text-muted-foreground">
				{expense.installmentNumber && expense.totalInstallments
					? `${expense.installmentNumber}/${expense.totalInstallments}`
					: "À vista"}
			</TableCell>
			<TableCell className="text-right font-medium">
				{formatCurrency(expense.amount)}
			</TableCell>
			<TableCell className="text-center">
				<ExpenseDetailSheet
					expense={expense}
					cardSlug={cardSlug || ""}
					month={selectedMonth}
				>
					<Button variant="ghost" size="sm" className="h-8 w-8 p-0">
						<MoreVertical className="h-4 w-4" />
						<span className="sr-only">Ver detalhes</span>
					</Button>
				</ExpenseDetailSheet>
			</TableCell>
		</TableRow>
	);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-12">
				<Loader className="w-6 h-6 animate-spin" />
			</div>
		);
	}

	if (!data?.card) {
		return (
			<div className="text-center py-12 space-y-3">
				<CreditCard className="w-12 h-12 mx-auto text-muted-foreground/50" />
				<div className="space-y-1">
					<p className="text-lg font-medium">Cartão não encontrado</p>
					<p className="text-sm text-muted-foreground">
						O cartão solicitado não existe ou você não tem acesso a ele
					</p>
				</div>
			</div>
		);
	}

	const { card } = data;

	return (
		<div className="space-y-6 mb-10">
			{/* Breadcrumb */}
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/app">Cartões</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{card.name}</BreadcrumbPage>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Visão Geral</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			{/* Header */}
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="space-y-1">
						<h2 className="text-2xl font-semibold">Visão Geral</h2>
						<p className="text-sm text-muted-foreground">
							Acompanhe suas despesas e faturas
						</p>
					</div>
				</div>
			</div>

			{/* Card Information */}
			<Card className="border-border/50 bg-gradient-to-br from-muted/30 to-muted/10">
				<CardContent className="p-6">
					<div className="flex items-start justify-between mb-6">
						<div className="flex items-center gap-4">
							<div
								className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getCardFlagColor(card.flag)} flex items-center justify-center shadow-lg`}
							>
								<CreditCard className="w-8 h-8 text-white" />
							</div>
							<div>
								<div className="flex items-center gap-2 mb-1">
									<p className="text-xl font-bold">{card.name}</p>
									<Badge
										variant={card.isActive ? "default" : "secondary"}
										className={
											card.isActive ? "bg-emerald-500 hover:bg-emerald-600" : ""
										}
									>
										{card.isActive ? "Ativo" : "Inativo"}
									</Badge>
								</div>
								<p className="text-sm text-muted-foreground">
									{card.bank} •••• {card.lastDigits}
								</p>
								<div className="flex items-center gap-2 mt-1">
									<div className="flex items-center gap-1">
										<Users className="w-3 h-3 text-muted-foreground" />
										<span className="text-xs text-muted-foreground">
											{card.membersCount}{" "}
											{card.membersCount === 1 ? "membro" : "membros"}
										</span>
									</div>
									<AddMemberDialog cardSlug={cardSlug || ""}>
										<Button variant="ghost" size="sm" className="h-6 px-2">
											<UserPlus className="w-3 h-3 mr-1" />
											<span className="text-xs">Adicionar</span>
										</Button>
									</AddMemberDialog>
								</div>
							</div>
						</div>
						<Badge variant="outline" className="text-xs">
							{card.flag}
						</Badge>
					</div>

					<div className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="space-y-1">
								<p className="text-xs text-muted-foreground">Limite Total</p>
								<p className="text-2xl font-bold">
									{formatCurrency(card.limit)}
								</p>
							</div>
							<div className="space-y-1">
								<p className="text-xs text-muted-foreground">
									Data de Fechamento
								</p>
								<p className="text-2xl font-bold">
									{card.closingDay ? `Dia ${card.closingDay}` : "N/A"}
								</p>
							</div>
							<div className="space-y-1">
								<p className="text-xs text-muted-foreground">
									Data de Vencimento
								</p>
								<p className="text-2xl font-bold">
									{card.paymentDay ? `Dia ${card.paymentDay}` : "N/A"}
								</p>
							</div>
						</div>

						{/* Limit Usage */}
						{card.limit && summaryData?.summary && (
							<div className="space-y-2 pt-2 border-t border-border/50">
								<div className="flex items-center justify-between text-sm">
									<span className="text-muted-foreground">
										Limite Utilizado
									</span>
									<span className="font-medium">
										{formatCurrency(summaryData.summary.totalInvoice)} de{" "}
										{formatCurrency(card.limit)}
									</span>
								</div>
								<Progress
									value={summaryData.summary.totalInvoice}
									max={card.limit}
									className="h-2"
								/>
								<p className="text-xs text-muted-foreground text-right">
									{card.limit
										? `${((summaryData.summary.totalInvoice / card.limit) * 100).toFixed(1)}% utilizado`
										: ""}
								</p>
							</div>
						)}
					</div>
				</CardContent>
			</Card>

			{/* Summary Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Card className="border-border/50 bg-gradient-to-br from-blue-500/5 to-blue-500/10">
					<CardContent>
						<div className="space-y-1">
							<p className="text-sm text-muted-foreground">Total da Fatura</p>
							<p className="text-3xl font-bold text-blue-600">
								{summaryData?.summary
									? formatCurrency(summaryData.summary.totalInvoice)
									: "R$ 0,00"}
							</p>
						</div>
					</CardContent>
				</Card>

				<Card className="border-border/50 bg-gradient-to-br from-green-500/5 to-green-500/10">
					<CardContent>
						<div className="space-y-1">
							<p className="text-sm text-muted-foreground">Minhas Despesas</p>
							<p className="text-3xl font-bold text-green-600">
								{summaryData?.summary
									? formatCurrency(summaryData.summary.totalUser)
									: "R$ 0,00"}
							</p>
						</div>
					</CardContent>
				</Card>

				<Card className="border-border/50 bg-gradient-to-br from-orange-500/5 to-orange-500/10">
					<CardContent>
						<div className="space-y-1">
							<p className="text-sm text-muted-foreground">
								Despesas de Outros
							</p>
							<p className="text-3xl font-bold text-orange-600">
								{summaryData?.summary
									? formatCurrency(summaryData.summary.totalOthers)
									: "R$ 0,00"}
							</p>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Expenses Table with Tabs */}
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-semibold">Despesas do Mês</h3>

					<Select
						value={selectedInvoiceId}
						onValueChange={setSelectedInvoiceId}
					>
						<SelectTrigger className="w-fit">
							<Calendar className="w-4 h-4 mr-2" />
							<SelectValue placeholder="Selecione uma fatura" />
						</SelectTrigger>
						<SelectContent>
							{invoicesData?.invoices.map((invoice) => {
								return (
									<SelectItem key={invoice.id} value={invoice.id}>
										<div className="flex items-center justify-between gap-2 w-full">
											<span>{formatInvoiceLabel(invoice)}</span>
										</div>
									</SelectItem>
								);
							})}
						</SelectContent>
					</Select>
				</div>

				<Tabs defaultValue="my-expenses" className="w-full">
					<TabsList className="grid w-full grid-cols-2 h-12 p-1 bg-muted/50">
						<TabsTrigger
							value="my-expenses"
							className="text-base font-medium data-[state=active]:bg-amber-500 data-[state=active]:text-white data-[state=active]:shadow-md"
						>
							Minhas Despesas
						</TabsTrigger>
						<TabsTrigger
							value="all-expenses"
							className="text-base font-medium data-[state=active]:bg-amber-500 data-[state=active]:text-white data-[state=active]:shadow-md"
						>
							Todas as Despesas
						</TabsTrigger>
					</TabsList>

					{/* My Expenses Tab */}
					<TabsContent value="my-expenses" className="space-y-4">
						<ExpenseFilters
							searchQuery={myExpensesSearchQuery}
							onSearchChange={setMyExpensesSearchQuery}
							selectedCategory={myExpensesCategory}
							onCategoryChange={setMyExpensesCategory}
							totalResults={myExpensesPagination.total}
						/>

						<Card className="border-border/50">
							{isLoadingMyExpenses ? (
								<ExpenseTableSkeleton />
							) : (
								<>
									<Table>
										<TableHeader>
											<TableRow className="hover:bg-transparent">
												<TableHead>Descrição</TableHead>
												<TableHead>Data</TableHead>
												<TableHead>Categoria</TableHead>
												<TableHead>Responsável</TableHead>
												<TableHead className="text-center">Parcela</TableHead>
												<TableHead className="text-right">Valor</TableHead>
												<TableHead className="text-center">
													Detalhamento
												</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{myExpenses.length > 0 ? (
												myExpenses.map(renderExpenseRow)
											) : (
												<TableRow>
													<TableCell
														colSpan={7}
														className="text-center text-muted-foreground py-8"
													>
														{myExpensesSearchQuery ||
														myExpensesCategory !== "all"
															? "Nenhuma despesa encontrada com os filtros aplicados"
															: "Nenhuma despesa encontrada para este mês"}
													</TableCell>
												</TableRow>
											)}
										</TableBody>
									</Table>

									{myExpensesPagination.total > 0 && (
										<div className="p-4 border-t">
											<Pagination
												currentPage={myExpensesPagination.page}
												totalPages={myExpensesPagination.pages}
												totalItems={myExpensesPagination.total}
												itemsPerPage={myExpensesPagination.limit}
												onPageChange={setMyExpensesPage}
												onItemsPerPageChange={(perPage) => {
													setMyExpensesPerPage(perPage);
													setMyExpensesPage(1);
												}}
											/>
										</div>
									)}
								</>
							)}
						</Card>
					</TabsContent>

					{/* All Expenses Tab */}
					<TabsContent value="all-expenses" className="space-y-4">
						<ExpenseFilters
							searchQuery={allExpensesSearchQuery}
							onSearchChange={setAllExpensesSearchQuery}
							selectedCategory={allExpensesCategory}
							onCategoryChange={setAllExpensesCategory}
							totalResults={allExpensesPagination.total}
						/>

						<Card className="border-border/50">
							{isLoadingAllExpenses ? (
								<ExpenseTableSkeleton />
							) : (
								<>
									<Table>
										<TableHeader>
											<TableRow className="hover:bg-transparent">
												<TableHead>Descrição</TableHead>
												<TableHead>Data</TableHead>
												<TableHead>Categoria</TableHead>
												<TableHead>Responsável</TableHead>
												<TableHead className="text-center">Parcela</TableHead>
												<TableHead className="text-right">Valor</TableHead>
												<TableHead className="text-center">
													Detalhamento
												</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{allExpenses.length > 0 ? (
												allExpenses.map(renderExpenseRow)
											) : (
												<TableRow>
													<TableCell
														colSpan={7}
														className="text-center text-muted-foreground py-8"
													>
														{allExpensesSearchQuery ||
														allExpensesCategory !== "all"
															? "Nenhuma despesa encontrada com os filtros aplicados"
															: "Nenhuma despesa encontrada para este mês"}
													</TableCell>
												</TableRow>
											)}
										</TableBody>
									</Table>

									{allExpensesPagination.total > 0 && (
										<div className="p-4 border-t">
											<Pagination
												currentPage={allExpensesPagination.page}
												totalPages={allExpensesPagination.pages}
												totalItems={allExpensesPagination.total}
												itemsPerPage={allExpensesPagination.limit}
												onPageChange={setAllExpensesPage}
												onItemsPerPageChange={(perPage) => {
													setAllExpensesPerPage(perPage);
													setAllExpensesPage(1);
												}}
											/>
										</div>
									)}
								</>
							)}
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};
