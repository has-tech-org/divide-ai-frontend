import type { CardFlag } from "@/features/cards/api/create-card";

export const getCardFlagColor = (flag: CardFlag) => {
	const colors = {
		VISA: "from-blue-500 to-blue-700",
		MASTERCARD: "from-red-500 to-orange-500",
		ELO: "from-yellow-500 to-yellow-600",
		AMEX: "from-blue-400 to-blue-600",
		HIPERCARD: "from-red-600 to-red-700",
		OTHER: "from-gray-500 to-gray-600",
	};
	return colors[flag] || colors.OTHER;
};

export const getCardFlagBorderColor = (flag: CardFlag) => {
	const colors = {
		VISA: "border-l-blue-600",
		MASTERCARD: "border-l-orange-500",
		ELO: "border-l-yellow-500",
		AMEX: "border-l-blue-500",
		HIPERCARD: "border-l-red-600",
		OTHER: "border-l-gray-500",
	};
	return colors[flag] || colors.OTHER;
};
