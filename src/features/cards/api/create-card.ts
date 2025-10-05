import { api } from "@/lib/api";

export enum CardFlag {
	VISA = "VISA",
	MASTERCARD = "MASTERCARD",
	ELO = "ELO",
	AMEX = "AMEX",
	HIPERCARD = "HIPERCARD",
	OTHER = "OTHER",
}

export interface CreateCardRequest {
	name: string;
	description?: string;
	bank: string;
	cardNumber: string; // Last 4 digits
	flag: CardFlag;
	closingDay?: number;
	paymentDay?: number;
	limit?: number;
}

export interface Card {
	id: string;
	name: string;
	slug: string;
	bank: string;
	last_digits: string;
	flag: CardFlag;
	limit: number | null;
	closing_day: number | null;
	payment_day: number | null;
}

export interface CreateCardResponse {
	card: Card;
}

export const createCard = async (
	data: CreateCardRequest,
): Promise<CreateCardResponse> => {
	const response = await api.post<CreateCardResponse>("/cards", data);
	return response.data;
};
