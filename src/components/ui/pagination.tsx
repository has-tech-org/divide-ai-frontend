import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	itemsPerPage: number;
	onPageChange: (page: number) => void;
	onItemsPerPageChange: (itemsPerPage: number) => void;
}

export function Pagination({
	currentPage,
	totalPages,
	totalItems,
	itemsPerPage,
	onPageChange,
	onItemsPerPageChange,
}: PaginationProps) {
	const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(currentPage * itemsPerPage, totalItems);

	const canGoPrevious = currentPage > 1;
	const canGoNext = currentPage < totalPages;

	// Generate page numbers to display
	const getPageNumbers = () => {
		const pages: (number | string)[] = [];
		const maxVisiblePages = 5;

		if (totalPages <= maxVisiblePages) {
			// Show all pages if total is less than max visible
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			// Always show first page
			pages.push(1);

			if (currentPage > 3) {
				pages.push("...");
			}

			// Show pages around current page
			const startPage = Math.max(2, currentPage - 1);
			const endPage = Math.min(totalPages - 1, currentPage + 1);

			for (let i = startPage; i <= endPage; i++) {
				pages.push(i);
			}

			if (currentPage < totalPages - 2) {
				pages.push("...");
			}

			// Always show last page
			pages.push(totalPages);
		}

		return pages;
	};

	if (totalPages <= 1) {
		return (
			<div className="flex items-center justify-between px-2">
				<p className="text-sm text-muted-foreground">
					Mostrando {startItem} a {endItem} de {totalItems}{" "}
					{totalItems === 1 ? "item" : "itens"}
				</p>
				<div className="flex items-center gap-2">
					<p className="text-sm text-muted-foreground">Itens por página</p>
					<Select
						value={itemsPerPage.toString()}
						onValueChange={(value) => onItemsPerPageChange(Number(value))}
					>
						<SelectTrigger className="w-[70px]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="10">10</SelectItem>
							<SelectItem value="25">25</SelectItem>
							<SelectItem value="50">50</SelectItem>
							<SelectItem value="100">100</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
			<p className="text-sm text-muted-foreground">
				Mostrando {startItem} a {endItem} de {totalItems}{" "}
				{totalItems === 1 ? "item" : "itens"}
			</p>

			<div className="flex items-center gap-6">
				{/* Items per page selector */}
				<div className="flex items-center gap-2">
					<p className="text-sm text-muted-foreground">Itens por página</p>
					<Select
						value={itemsPerPage.toString()}
						onValueChange={(value) => onItemsPerPageChange(Number(value))}
					>
						<SelectTrigger className="w-[70px]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="10">10</SelectItem>
							<SelectItem value="25">25</SelectItem>
							<SelectItem value="50">50</SelectItem>
							<SelectItem value="100">100</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Pagination controls */}
				<div className="flex items-center gap-1">
					<Button
						variant="outline"
						size="icon"
						className="h-8 w-8"
						onClick={() => onPageChange(1)}
						disabled={!canGoPrevious}
					>
						<ChevronsLeft className="h-4 w-4" />
						<span className="sr-only">Primeira página</span>
					</Button>
					<Button
						variant="outline"
						size="icon"
						className="h-8 w-8"
						onClick={() => onPageChange(currentPage - 1)}
						disabled={!canGoPrevious}
					>
						<ChevronLeft className="h-4 w-4" />
						<span className="sr-only">Página anterior</span>
					</Button>

					{/* Page numbers */}
					<div className="flex items-center gap-1">
						{getPageNumbers().map((page, index) => {
							if (page === "...") {
								return (
									<span
										key={`ellipsis-${index}`}
										className="px-2 text-sm text-muted-foreground"
									>
										...
									</span>
								);
							}

							return (
								<Button
									key={page}
									variant={currentPage === page ? "default" : "outline"}
									size="icon"
									className="h-8 w-8"
									onClick={() => onPageChange(page as number)}
								>
									{page}
								</Button>
							);
						})}
					</div>

					<Button
						variant="outline"
						size="icon"
						className="h-8 w-8"
						onClick={() => onPageChange(currentPage + 1)}
						disabled={!canGoNext}
					>
						<ChevronRight className="h-4 w-4" />
						<span className="sr-only">Próxima página</span>
					</Button>
					<Button
						variant="outline"
						size="icon"
						className="h-8 w-8"
						onClick={() => onPageChange(totalPages)}
						disabled={!canGoNext}
					>
						<ChevronsRight className="h-4 w-4" />
						<span className="sr-only">Última página</span>
					</Button>
				</div>
			</div>
		</div>
	);
}
