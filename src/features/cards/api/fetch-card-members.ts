import { api } from "@/lib/api";

export interface CardMember {
	id: string;
	userId: string;
	name: string;
	email: string;
	phone: string;
	role: "ADMIN" | "DEPENDENT";
	isActive: boolean;
}

export interface FetchCardMembersResponse {
	members: CardMember[];
}

export const fetchCardMembers = async (
	cardSlug: string,
): Promise<FetchCardMembersResponse> => {
	const response = await api.get<FetchCardMembersResponse>(
		`/cards/${cardSlug}/members`,
	);
	return response.data;
};
