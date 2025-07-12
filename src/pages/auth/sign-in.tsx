import { SignInForm } from "@/features/authentication/components/sign-in-form";

export const SignIn = () => {
	return (
		<>
			<header className="text-center space-y-1">
				<h3 className="text-3xl font-semibold">Bem vindo de volta!</h3>
				<span className="text-base text-muted-foreground">
					Insira seu email para continuar
				</span>
			</header>
			<SignInForm />
		</>
	);
};
