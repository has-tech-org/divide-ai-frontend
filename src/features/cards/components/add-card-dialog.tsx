import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { CreditCard, Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CardFlag, type CreateCardRequest } from "../api/create-card";
import { useCreateCard } from "../hooks/use-create-card";

const createCardSchema = z.object({
	name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
	description: z.string().optional(),
	bank: z.string().min(2, "Banco deve ter pelo menos 2 caracteres"),
	cardNumber: z
		.string()
		.length(4, "Digite os últimos 4 dígitos")
		.regex(/^\d{4}$/, "Apenas números"),
	flag: z
		.enum([
			CardFlag.VISA,
			CardFlag.MASTERCARD,
			CardFlag.ELO,
			CardFlag.AMEX,
			CardFlag.HIPERCARD,
			CardFlag.OTHER,
		])
		.optional(),
	closingDay: z.number().min(1).max(31).optional(),

	paymentDay: z.number().min(1).max(31).optional(),
	limit: z.number().positive().optional(),
});

type CreateCardFormData = z.infer<typeof createCardSchema>;

export const AddCardDialog = () => {
	const [open, setOpen] = useState(false);
	const { mutateAsync: createCard, isPending } = useCreateCard();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm<CreateCardFormData>({
		resolver: zodResolver(createCardSchema),
	});

	const handleCreateCard = handleSubmit(async (data) => {
		try {
			if (!data.flag) {
				return toast.error("Selecione uma bandeira");
			}
			await createCard(data as CreateCardRequest);
			toast.success("Cartão cadastrado com sucesso!");
			setOpen(false);
			reset();
		} catch (error) {
			if (isAxiosError(error)) {
				if (error.response?.data?.message) {
					return toast.error(error.response.data.message);
				}
			}
			return toast.error("Erro ao cadastrar cartão");
		}
	});

	const flagOptions = [
		{ value: CardFlag.VISA, label: "Visa" },
		{ value: CardFlag.MASTERCARD, label: "Mastercard" },
		{ value: CardFlag.ELO, label: "Elo" },
		{ value: CardFlag.AMEX, label: "American Express" },
		{ value: CardFlag.HIPERCARD, label: "Hipercard" },
		{ value: CardFlag.OTHER, label: "Outro" },
	];

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size="default" variant="default">
					<CreditCard className="w-4 h-4" />
					Adicionar Novo Cartão
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Adicionar Cartão de Crédito</DialogTitle>
					<DialogDescription>
						Cadastre um novo cartão como titular
					</DialogDescription>
				</DialogHeader>

				<form className="space-y-4" onSubmit={handleCreateCard}>
					<div className="space-y-2">
						<Label htmlFor="name">Nome do Cartão *</Label>
						<Input
							id="name"
							{...register("name")}
							placeholder="Meu Cartão Principal"
						/>
						{errors.name && (
							<span className="text-red-500 text-sm">
								{errors.name.message}
							</span>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="bank">Banco *</Label>
						<Input
							id="bank"
							{...register("bank")}
							placeholder="Nubank, Itaú, etc."
						/>
						{errors.bank && (
							<span className="text-red-500 text-sm">
								{errors.bank.message}
							</span>
						)}
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="cardNumber">Últimos 4 dígitos *</Label>
							<Input
								id="cardNumber"
								{...register("cardNumber")}
								placeholder="1234"
								maxLength={4}
							/>
							{errors.cardNumber && (
								<span className="text-red-500 text-sm">
									{errors.cardNumber.message}
								</span>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="flag">Bandeira *</Label>
							<Select
								onValueChange={(value) =>
									setValue("flag", value as CardFlag, {
										shouldValidate: true,
									})
								}
							>
								<SelectTrigger id="flag">
									<SelectValue placeholder="Selecione" />
								</SelectTrigger>
								<SelectContent>
									{flagOptions.map((option) => (
										<SelectItem key={option.value} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{errors.flag && (
								<span className="text-red-500 text-sm">
									{errors.flag.message}
								</span>
							)}
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="closingDay">Dia de Fechamento</Label>
							<Input
								id="closingDay"
								type="number"
								{...register("closingDay", { valueAsNumber: true })}
								placeholder="15"
								min={1}
								max={31}
							/>
							{errors.closingDay && (
								<span className="text-red-500 text-sm">
									{errors.closingDay.message}
								</span>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="paymentDay">Dia de Pagamento</Label>
							<Input
								id="paymentDay"
								type="number"
								{...register("paymentDay", { valueAsNumber: true })}
								placeholder="25"
								min={1}
								max={31}
							/>
							{errors.paymentDay && (
								<span className="text-red-500 text-sm">
									{errors.paymentDay.message}
								</span>
							)}
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="limit">Limite (R$)</Label>
						<Input
							id="limit"
							type="number"
							{...register("limit", { valueAsNumber: true })}
							placeholder="5000"
							step="0.01"
						/>
						{errors.limit && (
							<span className="text-red-500 text-sm">
								{errors.limit.message}
							</span>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="description">Descrição (opcional)</Label>
						<Input
							id="description"
							{...register("description")}
							placeholder="Cartão para despesas pessoais"
						/>
					</div>

					<div className="flex gap-2 pt-4">
						<Button
							type="button"
							variant="outline"
							className="flex-1"
							onClick={() => {
								setOpen(false);
								reset();
							}}
						>
							Cancelar
						</Button>
						<Button type="submit" className="flex-1" disabled={isPending}>
							{isPending ? (
								<Loader className="animate-spin w-4 h-4" />
							) : (
								"Cadastrar"
							)}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};
