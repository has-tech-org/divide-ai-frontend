import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { isAxiosError } from "axios";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignUp } from "../hooks/use-sign-up";

const signUpFormSchema = z.object({
	email: z.string().email("Endereço de email inválido"),
	name: z.string().min(5, "Nome completo deve ter pelo menos 5 caracteres"),
	phone: z.string().min(11, "Telefone deve ter pelo menos 11 caracteres"),
});

type SignUpFormData = z.infer<typeof signUpFormSchema>;

export const SignUpForm = () => {
	const navigate = useNavigate();
	const { mutateAsync: signUp, isPending } = useSignUp();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpFormData>({
		resolver: zodResolver(signUpFormSchema),
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

	const handleSignUp = handleSubmit(async (data) => {
		try {
			// Remove formatting before sending
			const phoneNumbers = data.phone.replace(/\D/g, "");
			await signUp({ ...data, phone: phoneNumbers });
			toast.success("Conta criada com sucesso!");
			navigate("/");
		} catch (error) {
			if (isAxiosError(error)) {
				if (error.status === 409) {
					return toast.error("Este email já foi cadastrado anteriormente");
				}
			}

			return toast.error("Aconteceu um erro inesperado");
		}
	});

	return (
		<form className="w-full space-y-4" onSubmit={handleSignUp}>
			<div className="space-y-2">
				<Label htmlFor="name" className="block">
					Nome completo
				</Label>
				<Input id="name" {...register("name")} placeholder="John Doe" />
				<span className="text-red-500 text-sm">{errors.name?.message}</span>
			</div>

			<div className="space-y-2">
				<Label htmlFor="email" className="block">
					Email
				</Label>
				<Input
					id="email"
					{...register("email")}
					placeholder="john.doe@example.com"
				/>
				<span className="text-red-500 text-sm">{errors.email?.message}</span>
			</div>

			<div className="space-y-2">
				<Label htmlFor="phone" className="block">
					Telefone
				</Label>
				<Input
					id="phone"
					{...register("phone")}
					placeholder="(11) 99999-9999"
					onChange={handlePhoneChange}
					maxLength={15}
				/>
				<span className="text-red-500 text-sm">{errors.phone?.message}</span>
			</div>

			<Button variant="default" className="w-full" disabled={isPending}>
				{isPending ? (
					<Loader className="animate-spin w-4 h-4" />
				) : (
					"Criar conta"
				)}
			</Button>

			<Link
				to="/"
				className="text-sm text-muted-foreground hover:underline block text-center"
			>
				Já tem uma conta? Faça login
			</Link>
		</form>
	);
};
