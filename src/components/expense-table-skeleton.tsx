import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface ExpenseTableSkeletonProps {
	rows?: number;
}

export function ExpenseTableSkeleton({ rows = 5 }: ExpenseTableSkeletonProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow className="hover:bg-transparent">
					<TableHead>Descrição</TableHead>
					<TableHead>Data</TableHead>
					<TableHead>Categoria</TableHead>
					<TableHead>Responsável</TableHead>
					<TableHead className="text-center">Parcela</TableHead>
					<TableHead className="text-right">Valor</TableHead>
					<TableHead className="text-center">Ações</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{Array.from({ length: rows }).map((_, index) => (
					<TableRow key={index}>
						<TableCell>
							<Skeleton className="h-4 w-[180px]" />
						</TableCell>
						<TableCell>
							<Skeleton className="h-4 w-[100px]" />
						</TableCell>
						<TableCell>
							<div className="flex items-center gap-2">
								<Skeleton className="h-6 w-6 rounded-md" />
								<Skeleton className="h-4 w-[80px]" />
							</div>
						</TableCell>
						<TableCell>
							<Skeleton className="h-4 w-[120px]" />
						</TableCell>
						<TableCell className="text-center">
							<div className="flex justify-center">
								<Skeleton className="h-4 w-[60px]" />
							</div>
						</TableCell>
						<TableCell className="text-right">
							<div className="flex justify-end">
								<Skeleton className="h-4 w-[90px]" />
							</div>
						</TableCell>
						<TableCell className="text-center">
							<div className="flex justify-center">
								<Skeleton className="h-8 w-8 rounded-md" />
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
