import { useMutation } from "@tanstack/react-query";
import { signUp } from "../api/sign-up";

export const useSignUp = () => {
	return useMutation({
		mutationFn: signUp,
	});
};
