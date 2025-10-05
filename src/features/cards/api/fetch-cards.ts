import { api } from "@/lib/api";

type Role = "DEPENDENT" | "ADMIN";

export type Card = {
	id: string;
	name: string;
	slug: string;
	last_digits: string;
	is_active: boolean;
	created_at: string;
	role: Role;
	is_cardholder: boolean;
};

export type FetchCardsResponse = {
	cards: Card[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
};

export const fetchCards = async (): Promise<FetchCardsResponse> => {
	const response = await api.get<FetchCardsResponse>("/cards", {
		params: {
			limit: 100,
		},
	});

	return response.data;
};
