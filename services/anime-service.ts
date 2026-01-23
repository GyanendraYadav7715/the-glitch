import { apiRequest } from "@/lib/api-client";
import {
    HomeApiResponse,
    SearchApiResponse,
    DetailedApiResponse,
    CharactersApiResponse,
    CharacterApiResponse,
    VoiceActorDeatieldApiResposne
} from "@/types/home.type";

export const AnimeService = {
    getHomeData: async () => {
        return await apiRequest<HomeApiResponse>("/home");
    },

    /**
     * Fetches anime based on category and page number
     * @param category - The type of anime (e.g., 'dubbed-anime', 'subbed-anime')
     * @param page - The page number (defaults to 1)
     * @param genres 
     * @param letters 
     */
    getFilteredAnime: async (category: string, page: number = 1) => {
        return await apiRequest<SearchApiResponse>(`/animes/${category}?page=${page}`);
    },

    getGenereAnime: async (genres: string, page: number = 1) => {
        return await apiRequest<SearchApiResponse>(`/animes/genre/${genres}?page=${page}`);
    },
    getAZListAnime: async (letters: string, page: number = 1) => {
        return await apiRequest<SearchApiResponse>(`/animes/az-list/${letters}?page=${page}`);
    },
    getDetailedAnime: async (id: string) => {
        return await apiRequest<DetailedApiResponse>(`/anime/${id}`)
    },
    getCharctersAnime: async (id: string) => {
        return await apiRequest<CharactersApiResponse>(`/characters/${id}`)
    },
    getCharcterAnime: async (id: string) => {
        return await apiRequest<CharacterApiResponse>(`/character/${id}`)
    },
    getVoiceActorAnime: async (id: string) => {
        return await apiRequest<VoiceActorDeatieldApiResposne>(`/people/${id}`)
    },



    

};