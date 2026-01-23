import { apiRequest } from "@/lib/api-client";
import { HomeApiResponse, SearchApiResponse } from "@/types/home.type";
import { ScheduleApiResponse, ScheduleOneApiResponse } from "@/types/schedule.type"
import { AnimeDetailedApiResponse } from "@/types/detailed.type"
import { EpisodesApiResponse } from "@/types/episodes.type"
import { CharactersApiResponse, CharacterApiResponse, VoiceActorDeatieldApiResposne } from "@/types/character.type"
export const AnimeService = {

    getHomeData: async () => {
        return await apiRequest<HomeApiResponse>("/home");
    },
    getSearchAnime: async (keyword: string, page: number = 1) => {
        return await apiRequest<SearchApiResponse>(`/search?keyword=${keyword}?page=${page}`);
    },
    getGenereAnime: async (genres: string, page: number = 1) => {
        return await apiRequest<SearchApiResponse>(`/animes/genre/${genres}?page=${page}`);
    },
    getScheduleAllData: async () => {
        return await apiRequest<ScheduleApiResponse>(`/schadule`)
    },
    getScheduleOneData: async (id: string) => {
        return await apiRequest<ScheduleOneApiResponse>(`/schadule/next/${id}`)
    },
    getAnimeDetailedData: async (id: string) => {
        return await apiRequest<AnimeDetailedApiResponse>(`/anime/${id}`);
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
    getAnimeEpisodesData: async (id: string) => {
        const data = await apiRequest<EpisodesApiResponse>(`/episodes/${id}`);
        return data.data;
    },
    getFilteredAnime: async (category: string, page: number = 1) => {
        return await apiRequest<SearchApiResponse>(`/animes/${category}?page=${page}`);
    },
    getAZListAnime: async (letters: string, page: number = 1) => {
        return await apiRequest<SearchApiResponse>(`/animes/az-list/${letters}?page=${page}`);
    },
   
};