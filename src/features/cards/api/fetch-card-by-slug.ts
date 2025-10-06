import { api } from "@/lib/api";
import type { CardFlag } from "./create-card";

export type CardDetails = {
	id: string;
	name: string;
	slug: string;
	description: string | null;
	bank: string;
	lastDigits: string;
	flag: CardFlag;
	closingDay: number | null;
	paymentDay: number | null;
	limit: number | null;
	isActive: boolean;
	membersCount: number;
};

export type FetchCardBySlugResponse = {
	card: CardDetails;
};

export const fetchCardBySlug = async (
	slug: string,
): Promise<FetchCardBySlugResponse> => {
	const response = await api.get<FetchCardBySlugResponse>(`/cards/${slug}`);
	return response.data;
};
