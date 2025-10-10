import {
	Calendar,
	CircleDollarSign,
	CreditCard,
	Hash,
	Receipt,
	Tag,
	TrendingUp,
	User,
	UserCog,
} from "lucide-react";
import type { Expense } from "@/features/invoices/api/fetch-expenses";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { CategoryIcon, getCategoryLabel } from "@/components/category-icon";
import { ReassignExpenseDialog } from "@/components/reassign-expense-dialog";

interface ExpenseDetailSheetProps {
	expense: Expense;
	cardSlug: string;
	month: string;
	children: React.ReactNode;
}

export function ExpenseDetailSheet({
	expense,
	cardSlug,
	month,
	children,
}: ExpenseDetailSheetProps) {
	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(value);
	};

	const formatDateShort = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("pt-BR", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		});
	};

	const isInstallment =
		expense.installmentNumber !== null && expense.totalInstallments !== null;

	const installmentProgress = isInstallment
		? ((expense.installmentNumber ?? 0) / (expense.totalInstallments ?? 1)) *
			100
		: 0;

	const remainingInstallments = isInstallment
		? (expense.totalInstallments ?? 0) - (expense.installmentNumber ?? 0)
		: 0;

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="w-full sm:max-w-xl overflow-y-auto p-0">
				{/* Header Section */}
				<div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background p-0 border-b">
					<SheetHeader className="space-y-4">
						<div className="flex items-start justify-between">
							<div className="space-y-2 flex-1">
								<div className="flex items-center gap-2">
									<div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
										<Receipt className="h-5 w-5 text-primary" />
									</div>
									<div>
										<SheetTitle className="text-xl">
											Detalhes da Transação
										</SheetTitle>
										<SheetDescription className="text-xs">
											#{expense.id.slice(0, 8)}...
										</SheetDescription>
									</div>
								</div>
							</div>
							<CategoryIcon category={expense.category} size="lg" />
						</div>

						{/* Amount Display */}
						<div className="bg-background/80 backdrop-blur-sm rounded-xl p-6 space-y-3 border shadow-sm">
							<div className="space-y-2">
								<p className="text-sm text-muted-foreground">
									Descrição da Despesa
								</p>
								<h3 className="text-lg font-bold leading-tight">
									{expense.description}
								</h3>
								<div className="flex items-center gap-2 pt-1">
									<Hash className="h-3 w-3 text-muted-foreground" />
									<p className="text-xs font-mono text-muted-foreground">
										{expense.id}
									</p>
								</div>
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2 text-muted-foreground">
									<CircleDollarSign className="h-4 w-4" />
									<span className="text-sm font-medium">Valor da Parcela</span>
								</div>
								<p className="text-2xl font-bold text-primary">
									{formatCurrency(expense.amount)}
								</p>
							</div>
						</div>
					</SheetHeader>
				</div>

				{/* Content Section */}
				<div className="p-6 space-y-6">
					{/* Quick Stats */}
					<div className="grid grid-cols-2 gap-3">
						<div className="group relative overflow-hidden rounded-xl border bg-gradient-to-br from-orange-500/5 to-orange-500/10 p-4 hover:shadow-md transition-all">
							<div className="absolute top-0 right-0 h-20 w-20 bg-orange-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-orange-500/20 transition-colors" />
							<div className="relative space-y-2">
								<div className="flex items-center gap-2 text-xs font-medium text-orange-600">
									<Tag className="h-3.5 w-3.5" />
									<span className="uppercase tracking-wider">Categoria</span>
								</div>
								<p className="text-sm font-bold text-foreground">
									{getCategoryLabel(expense.category)}
								</p>
							</div>
						</div>

						<div className="group relative overflow-hidden rounded-xl border bg-gradient-to-br from-blue-500/5 to-blue-500/10 p-4 hover:shadow-md transition-all">
							<div className="absolute top-0 right-0 h-20 w-20 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-blue-500/20 transition-colors" />
							<div className="relative space-y-2">
								<div className="flex items-center gap-2 text-xs font-medium text-blue-600">
									<Calendar className="h-3.5 w-3.5" />
									<span className="uppercase tracking-wider">Data</span>
								</div>
								<p className="text-sm font-bold text-foreground">
									{formatDateShort(expense.date)}
								</p>
							</div>
						</div>
					</div>

					{/* Owner Card */}
					<div className="space-y-3">
						<h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
							<User className="h-4 w-4 text-muted-foreground" />
							Responsável pela Despesa
						</h4>
						<div className="rounded-xl border bg-gradient-to-br from-muted/50 to-muted/30 p-5 shadow-sm">
							<div className="flex items-center justify-between gap-4">
								<div className="flex items-center gap-4 flex-1">
									<div className="relative">
										<div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-md">
											<User className="h-6 w-6 text-primary-foreground" />
										</div>
										<div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-background border-2 border-background flex items-center justify-center">
											{expense.owner.role === "ADMIN" ? "👑" : "👤"}
										</div>
									</div>
									<div className="space-y-1 flex-1 min-w-0">
										<p className="font-semibold text-base truncate">
											{expense.owner.name}
										</p>
										<Badge
											variant={
												expense.owner.role === "ADMIN" ? "default" : "secondary"
											}
											className="text-xs h-5 font-medium"
										>
											{expense.owner.role === "ADMIN"
												? "Titular"
												: "Dependente"}
										</Badge>
									</div>
								</div>
								<ReassignExpenseDialog
									expense={expense}
									cardSlug={cardSlug}
									month={month}
								>
									<Button variant="outline" size="sm" className="shrink-0">
										<UserCog className="w-4 h-4 mr-2" />
										Reatribuir
									</Button>
								</ReassignExpenseDialog>
							</div>
						</div>
					</div>

					<Separator />

					{/* Payment Information */}
					<div className="space-y-4">
						<h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
							<CreditCard className="h-4 w-4 text-muted-foreground" />
							Informações de Pagamento
						</h4>

						{isInstallment ? (
							<div className="space-y-4">
								{/* Installment Summary Card */}
								<div className="rounded-xl border bg-gradient-to-br from-blue-500/5 via-blue-500/10 to-purple-500/10 p-5 shadow-sm space-y-4">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
												<TrendingUp className="h-5 w-5 text-blue-600" />
											</div>
											<div>
												<div className="flex items-center gap-2">
													<Badge className="bg-blue-600 hover:bg-blue-700 text-white">
														Parcelado
													</Badge>
													<span className="text-xl font-bold">
														{expense.installmentNumber}/
														{expense.totalInstallments}
													</span>
												</div>
												<p className="text-xs text-muted-foreground mt-1">
													Parcela atual do pagamento
												</p>
											</div>
										</div>
									</div>

									{/* Progress Section */}
									<div className="space-y-3 pt-2">
										<div className="flex justify-between items-center text-sm">
											<span className="text-muted-foreground font-medium">
												Progresso
											</span>
											<span className="font-bold text-blue-600">
												{installmentProgress.toFixed(0)}% concluído
											</span>
										</div>
										<div className="relative">
											<Progress
												value={installmentProgress}
												className="h-3 bg-muted"
											/>
										</div>
										<div className="flex justify-between items-center">
											<p className="text-xs text-muted-foreground">
												{remainingInstallments > 0 && (
													<>
														<span className="font-semibold text-foreground">
															{remainingInstallments}
														</span>{" "}
														{remainingInstallments === 1
															? "parcela restante"
															: "parcelas restantes"}
													</>
												)}
												{remainingInstallments === 0 && (
													<span className="font-semibold text-green-600">
														✓ Pagamento completo
													</span>
												)}
											</p>
											<p className="text-xs text-muted-foreground">
												{expense.installmentNumber} de{" "}
												{expense.totalInstallments} pagas
											</p>
										</div>
									</div>
								</div>

								{/* Installment Breakdown */}
								<div className="rounded-xl border bg-muted/30 p-5 space-y-3">
									<h5 className="text-sm font-semibold mb-3">
										Detalhamento do Parcelamento
									</h5>
									<div className="space-y-3">
										<div className="flex justify-between items-center py-2">
											<span className="text-sm text-muted-foreground">
												Parcela Atual
											</span>
											<span className="text-base font-semibold">
												{expense.installmentNumber}ª
											</span>
										</div>
										<Separator />
										<div className="flex justify-between items-center py-2">
											<span className="text-sm text-muted-foreground">
												Valor por Parcela
											</span>
											<span className="text-base font-semibold">
												{formatCurrency(expense.amount)}
											</span>
										</div>
										<Separator />
										<div className="flex justify-between items-center py-2 bg-primary/5 -mx-5 px-5 rounded-lg">
											<span className="text-sm font-semibold">
												Valor Total Parcelado
											</span>
											<span className="text-lg font-bold text-primary">
												{formatCurrency(
													expense.amount * (expense.totalInstallments ?? 1),
												)}
											</span>
										</div>
									</div>
								</div>
							</div>
						) : (
							<div className="rounded-xl border bg-gradient-to-br from-green-500/5 to-emerald-500/10 p-5 shadow-sm">
								<div className="flex items-center gap-4">
									<div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
										<CreditCard className="h-6 w-6 text-green-600" />
									</div>
									<div className="flex-1">
										<p className="font-semibold text-base">Pagamento à Vista</p>
										<p className="text-sm text-muted-foreground">
											Transação única, sem parcelamento
										</p>
									</div>
									<Badge
										variant="secondary"
										className="bg-green-100 text-green-700 hover:bg-green-200"
									>
										À vista
									</Badge>
								</div>
							</div>
						)}
					</div>

				</div>
			</SheetContent>
		</Sheet>
	);
}
