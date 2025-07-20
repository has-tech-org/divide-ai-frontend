import { api } from "@/lib/api";

type User = {
	name: string;
	id: string;
	email: string;
	phone: string;
	avatar: string | null;
	is_active: boolean;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
};

type Response = {
	user: User;
};

export const getProfile = async (): Promise<Response> => {
	const response = await api.get("/get-profile");

	return response.data;
};
