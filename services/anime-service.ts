import { apiRequest } from "@/lib/api-client";
import { HomeApiResponse } from "@/types/home.type";

export const AnimeService = {
    getHomeData: async () => {
        return await apiRequest<HomeApiResponse>("/home");
    },
};