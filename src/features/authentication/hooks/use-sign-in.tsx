import { useMutation } from "@tanstack/react-query";
import { signIn } from "../api/sign-in";

export const useSignIn = () => {
	return useMutation({
		mutationFn: signIn,
	});
};
