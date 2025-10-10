import { Loader } from "lucide-react";
import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useFetchCardMembers } from "@/features/cards/hooks/use-fetch-card-members";
import { useReassignExpense } from "@/features/invoices/hooks/use-reassign-expense";
import type { Expense } from "@/features/invoices/api/fetch-expenses";

interface ReassignExpenseDialogProps {
	expense: Expense;
	cardSlug: string;
	month: string;
	children: React.ReactNode;
}

export function ReassignExpenseDialog({
	expense,
	cardSlug,
	month,
	children,
}: ReassignExpenseDialogProps) {
	const [open, setOpen] = useState(false);
	const [selectedMemberId, setSelectedMemberId] = useState<string>("");

	const { data: membersData, isLoading: isLoadingMembers } =
		useFetchCardMembers(cardSlug);
	const { mutateAsync: reassignExpense, isPending } = useReassignExpense(
		cardSlug,
		month,
	);

	const handleReassign = async () => {
		if (!selectedMemberId) {
			return;
		}

		try {
			await reassignExpense({
				expenseId: expense.id,
				data: { newOwnerId: selectedMemberId },
			});
			setOpen(false);
			setSelectedMemberId("");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Reatribuir Despesa</DialogTitle>
					<DialogDescription>
						Selecione um membro para reatribuir esta despesa
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					<div className="space-y-2">
						<Label className="text-sm font-medium">Despesa</Label>
						<p className="text-sm text-muted-foreground">
							{expense.description}
						</p>
					</div>

					<div className="space-y-2">
						<Label className="text-sm font-medium">Responsável atual</Label>
						<p className="text-sm text-muted-foreground">
							{expense.owner.name}
						</p>
					</div>

					<div className="space-y-2">
						<Label htmlFor="member" className="text-sm font-medium">
							Novo responsável
						</Label>
						<Select
							value={selectedMemberId}
							onValueChange={setSelectedMemberId}
							disabled={isLoadingMembers}
						>
							<SelectTrigger id="member">
								<SelectValue placeholder="Selecione um membro" />
							</SelectTrigger>
							<SelectContent>
								{membersData?.members
									.filter((member) => member.userId !== expense.owner.id)
									.map((member) => (
										<SelectItem key={member.userId} value={member.userId}>
											{member.name} (
											{member.role === "ADMIN" ? "Admin" : "Dependente"})
										</SelectItem>
									))}
							</SelectContent>
						</Select>
					</div>

					<div className="flex justify-end gap-3 pt-4">
						<Button
							type="button"
							variant="outline"
							onClick={() => setOpen(false)}
							disabled={isPending}
						>
							Cancelar
						</Button>
						<Button
							onClick={handleReassign}
							disabled={isPending || !selectedMemberId}
						>
							{isPending && <Loader className="w-4 h-4 mr-2 animate-spin" />}
							Reatribuir
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
