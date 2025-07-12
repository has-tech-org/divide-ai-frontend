import { api } from "@/lib/api";

type Params = {
	name: string;
	email: string;
	phone: string;
};

export const signUp = async (data: Params) => {
	const response = await api.post("/users/register", data);

	return response.data;
};
