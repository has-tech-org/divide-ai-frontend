import { api } from "@/lib/api";

export interface AddCardMemberRequest {
	name: string;
	email: string;
	phone: string;
}

export interface CardUser {
	id: string;
	userId: string;
	name: string;
	email: string;
	role: "ADMIN" | "DEPENDENT";
}

export interface AddCardMemberResponse {
	cardUser: CardUser;
}

export const addCardMember = async (
	cardSlug: string,
	data: AddCardMemberRequest,
): Promise<AddCardMemberResponse> => {
	const response = await api.post<AddCardMemberResponse>(
		`/cards/${cardSlug}/members`,
		data,
	);
	return response.data;
};
