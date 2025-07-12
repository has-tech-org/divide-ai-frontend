import { api } from "@/lib/api";

type Params = {
	email: string;
};

export const signIn = async (data: Params) => {
	const response = await api.post("/auth-link/send", data);

	return response.data;
};
