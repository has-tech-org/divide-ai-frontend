import { useQuery } from "@tanstack/react-query";
import { fetchCardBySlug } from "../api/fetch-card-by-slug";

export const useFetchCardBySlug = (slug: string) => {
	return useQuery({
		queryKey: ["card", slug],
		queryFn: () => fetchCardBySlug(slug),
		enabled: !!slug,
	});
};
