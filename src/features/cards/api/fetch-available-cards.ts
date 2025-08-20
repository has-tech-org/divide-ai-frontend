import { api } from "@/lib/api";

type Role = "DEPENDENT" | "ADMIN";

type Card = {
	id: string;
	name: string;
	slug: string;
	user_id: string;
	description: string;
	bank: string;
	last_digits: string;
	flag: string;
	closing_day: number;
	payment_day: number;
	limit: number;
	is_active: boolean;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	role: Role;
};

type Response = {
	adminCards: Card[];
	dependentCards: Card[];
	allCards: Card[];
	totalCards: number;
	totalAdminCards: number;
	totalDependentCards: number;
};

export const fetchCards = async () => {
	const response = await api.get<Response>("/cards");
	return response.data;
};
