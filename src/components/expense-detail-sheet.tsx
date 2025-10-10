import { Calendar, User, Tag, CreditCard, Hash, UserCog } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Expense } from "@/features/invoices/api/fetch-expenses";
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

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("pt-BR", {
			day: "2-digit",
			month: "long",
			year: "numeric",
		});
	};

	const isInstallment =
		expense.installmentNumber !== null && expense.totalInstallments !== null;

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="w-full sm:max-w-md overflow-y-auto">
				<SheetHeader>
					<SheetTitle>Detalhes da Despesa</SheetTitle>
					<SheetDescription>
						Informações completas sobre esta transação
					</SheetDescription>
				</SheetHeader>

				<div className="space-y-6 py-6">
					{/* Description & Amount */}
					<div className="space-y-2">
						<h3 className="text-2xl font-bold">{expense.description}</h3>
						<p className="text-3xl font-bold text-primary">
							{formatCurrency(expense.amount)}
						</p>
					</div>

					<Separator />

					{/* Category */}
					<div className="space-y-2">
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Tag className="h-4 w-4" />
							<span>Categoria</span>
						</div>
						<CategoryIcon category={expense.category} size="lg" showLabel />
					</div>

					<Separator />

					{/* Date */}
					<div className="space-y-2">
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Calendar className="h-4 w-4" />
							<span>Data da Transação</span>
						</div>
						<p className="text-base font-medium">{formatDate(expense.date)}</p>
					</div>

					<Separator />

					{/* Owner */}
					<div className="space-y-2">
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<User className="h-4 w-4" />
							<span>Responsável</span>
						</div>
						<div className="flex items-center justify-between">
							<div className="space-y-1">
								<p className="text-base font-medium">{expense.owner.name}</p>
								<Badge variant="outline" className="text-xs">
									{expense.owner.role === "ADMIN" ? "Titular" : "Dependente"}
								</Badge>
							</div>
							<ReassignExpenseDialog
								expense={expense}
								cardSlug={cardSlug}
								month={month}
							>
								<Button variant="outline" size="sm">
									<UserCog className="w-4 h-4 mr-2" />
									Reatribuir
								</Button>
							</ReassignExpenseDialog>
						</div>
					</div>

					<Separator />

					{/* Installment Info */}
					<div className="space-y-2">
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<CreditCard className="h-4 w-4" />
							<span>Tipo de Pagamento</span>
						</div>
						{isInstallment ? (
							<div className="space-y-2">
								<div className="flex items-center gap-2">
									<Badge variant="secondary" className="text-sm">
										Parcelado
									</Badge>
									<span className="text-base font-medium">
										{expense.installmentNumber}/{expense.totalInstallments}
									</span>
								</div>
								<div className="bg-muted rounded-md p-3 space-y-1">
									<div className="flex justify-between text-sm">
										<span className="text-muted-foreground">Parcela Atual</span>
										<span className="font-medium">
											{expense.installmentNumber}ª de{" "}
											{expense.totalInstallments}
										</span>
									</div>
									<div className="flex justify-between text-sm">
										<span className="text-muted-foreground">Valor por Parcela</span>
										<span className="font-medium">
											{formatCurrency(expense.amount)}
										</span>
									</div>
									<div className="flex justify-between text-sm">
										<span className="text-muted-foreground">Valor Total</span>
										<span className="font-medium">
											{formatCurrency(expense.amount * expense.totalInstallments)}
										</span>
									</div>
								</div>
							</div>
						) : (
							<Badge variant="secondary" className="text-sm">
								À vista
							</Badge>
						)}
					</div>

					<Separator />

					{/* Additional Info */}
					<div className="space-y-2">
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Hash className="h-4 w-4" />
							<span>Identificação</span>
						</div>
						<p className="text-xs font-mono text-muted-foreground break-all">
							{expense.id}
						</p>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
