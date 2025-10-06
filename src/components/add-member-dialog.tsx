import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { useAddCardMember } from "@/features/cards/hooks/use-add-card-member";

const addMemberSchema = z.object({
	name: z.string().min(1, "Nome é obrigatório"),
	email: z.string().email("E-mail inválido"),
	phone: z.string().min(1, "Telefone é obrigatório"),
});

type AddMemberFormData = z.infer<typeof addMemberSchema>;

interface AddMemberDialogProps {
	cardSlug: string;
	children: React.ReactNode;
}

export function AddMemberDialog({ cardSlug, children }: AddMemberDialogProps) {
	const [open, setOpen] = useState(false);
	const { mutateAsync: addMember, isPending } = useAddCardMember(cardSlug);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<AddMemberFormData>({
		resolver: zodResolver(addMemberSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
		},
	});

	const formatPhone = (value: string) => {
		const numbers = value.replace(/\D/g, "");
		if (numbers.length <= 10) {
			return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
		}
		return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
	};

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formatted = formatPhone(e.target.value);
		e.target.value = formatted;
	};

	const onSubmit = handleSubmit(async (data) => {
		try {
			// Remove formatting before sending
			const phoneNumbers = data.phone.replace(/\D/g, "");
			await addMember({ ...data, phone: phoneNumbers });
			reset();
			setOpen(false);
		} catch (error) {
			// Error handling is done in the mutation hook
		}
	});

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Adicionar Membro</DialogTitle>
					<DialogDescription>
						Adicione um novo dependente ao cartão. Ele receberá um convite por
						e-mail.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={onSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name" className="block">
							Nome completo
						</Label>
						<Input
							id="name"
							{...register("name")}
							placeholder="Ex: Maria Santos"
							disabled={isPending}
						/>
						{errors.name && (
							<span className="text-red-500 text-sm">{errors.name.message}</span>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="email" className="block">
							E-mail
						</Label>
						<Input
							id="email"
							type="email"
							{...register("email")}
							placeholder="maria@example.com"
							disabled={isPending}
						/>
						{errors.email && (
							<span className="text-red-500 text-sm">{errors.email.message}</span>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="phone" className="block">
							Telefone
						</Label>
						<Input
							id="phone"
							{...register("phone")}
							onChange={handlePhoneChange}
							placeholder="(11) 99999-9999"
							disabled={isPending}
						/>
						{errors.phone && (
							<span className="text-red-500 text-sm">{errors.phone.message}</span>
						)}
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
						<Button type="submit" disabled={isPending}>
							{isPending && <Loader className="w-4 h-4 mr-2 animate-spin" />}
							Adicionar
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
