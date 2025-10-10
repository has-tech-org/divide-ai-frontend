import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { ExpenseCategory } from "@/features/invoices/api/fetch-expenses";
import { CategoryIcon } from "@/components/category-icon";

interface ExpenseFiltersProps {
	searchQuery: string;
	onSearchChange: (query: string) => void;
	selectedCategory: ExpenseCategory | "all";
	onCategoryChange: (category: ExpenseCategory | "all") => void;
	totalResults: number;
}

const categoryOptions: Array<{ value: ExpenseCategory | "all"; label: string }> =
	[
		{ value: "all", label: "Todas as Categorias" },
		{ value: "FOOD", label: "Alimentação" },
		{ value: "SHOPPING", label: "Compras" },
		{ value: "TRANSPORT", label: "Transporte" },
		{ value: "ENTERTAINMENT", label: "Entretenimento" },
		{ value: "HEALTH", label: "Saúde" },
		{ value: "SERVICES", label: "Serviços" },
		{ value: "OTHER", label: "Outros" },
	];

export function ExpenseFilters({
	searchQuery,
	onSearchChange,
	selectedCategory,
	onCategoryChange,
	totalResults,
}: ExpenseFiltersProps) {
	const hasActiveFilters = searchQuery !== "" || selectedCategory !== "all";

	const handleClearFilters = () => {
		onSearchChange("");
		onCategoryChange("all");
	};

	return (
		<div className="space-y-4">
			<div className="flex flex-col sm:flex-row gap-3">
				{/* Search input */}
				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Buscar por descrição..."
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
						className="pl-9 pr-9"
					/>
					{searchQuery && (
						<button
							type="button"
							onClick={() => onSearchChange("")}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
						>
							<X className="h-4 w-4" />
							<span className="sr-only">Limpar busca</span>
						</button>
					)}
				</div>

				{/* Category filter */}
				<Select
					value={selectedCategory}
					onValueChange={(value) =>
						onCategoryChange(value as ExpenseCategory | "all")
					}
				>
					<SelectTrigger className="w-full sm:w-[240px]">
						<SelectValue placeholder="Categoria" />
					</SelectTrigger>
					<SelectContent>
						{categoryOptions.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								<div className="flex items-center gap-2">
									{option.value !== "all" && (
										<CategoryIcon category={option.value} size="sm" />
									)}
									<span>{option.label}</span>
								</div>
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				{/* Clear filters button */}
				{hasActiveFilters && (
					<Button
						variant="outline"
						size="default"
						onClick={handleClearFilters}
						className="w-full sm:w-auto"
					>
						<X className="h-4 w-4" />
						Limpar Filtros
					</Button>
				)}
			</div>

			{/* Results count */}
			{hasActiveFilters && (
				<p className="text-sm text-muted-foreground">
					{totalResults === 0
						? "Nenhuma despesa encontrada"
						: `${totalResults} ${totalResults === 1 ? "despesa encontrada" : "despesas encontradas"}`}
				</p>
			)}
		</div>
	);
}
