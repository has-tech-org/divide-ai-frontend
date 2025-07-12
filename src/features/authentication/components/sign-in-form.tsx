import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignIn } from "../hooks/use-sign-in";

const signInFormSchema = z.object({
	email: z.string().email("Endereço de email inválido"),
});

type SignInFormData = z.infer<typeof signInFormSchema>;

export const SignInForm = () => {
	const { mutateAsync: signIn, isPending } = useSignIn();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInFormData>({
		resolver: zodResolver(signInFormSchema),
	});

	const handleSignIn = handleSubmit(async (data) => {
		await signIn(data);
	});

	return (
		<form className="w-full space-y-4" onSubmit={handleSignIn}>
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

			<Button variant="default" className="w-full" disabled={isPending}>
				{isPending ? <Loader className="animate-spin w-4 h-4" /> : "Entrar"}
			</Button>

			<Link
				to="/primeiro-acesso"
				className="text-sm text-muted-foreground hover:underline block text-center"
			>
				Primeiro acesso? Crie uma conta
			</Link>
		</form>
	);
};
