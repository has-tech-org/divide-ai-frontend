import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const SignIn = () => {
	return (
		<div className="max-w-lg px-4 w-full mx-auto flex flex-col justify-center items-center h-full gap-10">
			<header className="text-center space-y-1">
				<h3 className="text-3xl font-semibold">Bem vindo de volta!</h3>
				<span className="text-base text-muted-foreground">
					Insira seu email para continuar
				</span>
			</header>
			<form className="w-full space-y-4">
				<div className="space-y-2">
					<Label htmlFor="email" className="block">
						Email
					</Label>
					<Input placeholder="john.doe@example.com" />
				</div>

				<Button variant="default" className="w-full">
					Entrar
				</Button>
			</form>

			<footer>
				<span className="text-center text-lg text-accent-foreground block">
					divideai.app
				</span>

				<p className="text-center text-sm text-muted-foreground">
					Gerencie suas contas de cartão de crédito.
				</p>
			</footer>
		</div>
	);
};
