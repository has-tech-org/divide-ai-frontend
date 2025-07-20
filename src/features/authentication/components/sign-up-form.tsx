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

const signInFormSchema = z.object({
	email: z.string().email("Endereço de email inválido"),
	name: z.string().min(5, "Nome completo deve ter pelo menos 5 caracteres"),
	phone: z.string().min(11, "Telefone deve ter pelo menos 11 caracteres"),
});

type SignInFormData = z.infer<typeof signInFormSchema>;

export const SignUpForm = () => {
	const navigate = useNavigate();
	const { mutateAsync: signUp, isPending } = useSignUp();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInFormData>({
		resolver: zodResolver(signInFormSchema),
	});

	const handleSignIn = handleSubmit(async (data) => {
		try {
			await signUp(data);
			toast.success("Conta criada com sucesso!");
			navigate("/");
		} catch (error) {
			if (isAxiosError(error)) {
				if (error.status === 400) {
					return toast.error(error.response?.data.message);
				}
			}

			return toast.error("Aconteceu um erro inesperado");
		}
	});

	return (
		<form className="w-full space-y-4" onSubmit={handleSignIn}>
			<div className="space-y-2">
				<Label htmlFor="email" className="block">
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
