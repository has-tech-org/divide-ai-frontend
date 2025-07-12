import { SignUpForm } from "@/features/authentication/components/sign-up-form";

export const SignUp = () => {
	return (
		<>
			<header className="text-center space-y-1">
				<h3 className="text-3xl font-semibold">Crie sua conta</h3>
				<span className="text-base text-muted-foreground">
					Insira seus dados para continuar
				</span>
			</header>
			<SignUpForm />
		</>
	);
};
