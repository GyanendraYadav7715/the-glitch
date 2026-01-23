import { BaseAnime,CommonAnimeCard } from "./home.type";

interface Aired {
    from: string;
    to: string | null;
}
export interface season extends BaseAnime {
    isActive: boolean;
}
export interface recommendedData extends CommonAnimeCard {
    duration: string;
    is18Plus: boolean;
}
export interface DetailedApiResponseData extends recommendedData {
    aired:Aired;
    synonyms: string;
    synopsis: string;
    rating: string;
    premiered: string;
    duration: string;
    status: string;
    MAL_score: string,
    genres: string[];
    studios: string[];
    producers: string[];
    moreSeasons: season[];
    related: CommonAnimeCard;
    mostPopular: CommonAnimeCard[];
    recommended: recommendedData[];
}
export interface AnimeDetailedApiResponse {
    success: boolean;
    data: DetailedApiResponseData;
}