import { api } from "@/lib/api";

type Response = {
	id: string;
	name: string;
	slug: string;
	bank: string;
	flag: string;
	deletedAt: string | null;
	createdAt: string;
	updatedAt: string;

	card_users: {
		id: string;
		role: string;
	}[];
};

export const fetchAvailableCards = async () => {
	const response = await api.get<Response[]>("/cards/available");
	return response.data;
};
