export enum AnimeQuality {
    HD = "HD",
    SD = "SD",
    UltraHD = "Ultra HD",
}

export enum AnimeType {
    TV = "TV",
    Movie = "Movie",
    OVA = "OVA",
    Special = "Special",
}

export interface EpisodeInfo {
    sub: number;
    dub: number;
    eps: number;
}
export interface BaseAnime {
    id: string;
    title: string;
    alternativeTitle: string;
    poster: string;
}
export interface SpotlightAnime extends BaseAnime {
    rank: number;
    type: AnimeType | string;
    quality: AnimeQuality | string;
    duration: string;
    aired: string;
    synopsis: string;
    episodes: EpisodeInfo;
}
export interface CommonAnimeCard extends BaseAnime {
    type?: AnimeType |string;
    episodes: EpisodeInfo;
}
export interface TrendingAnime extends BaseAnime {
    rank: number;
}
export interface Top10Anime extends BaseAnime {
    rank: number;
    episodes: EpisodeInfo;
}

export interface Top10 {
    today: Top10Anime[];
    week: Top10Anime[];
    month: Top10Anime[];
}
export interface AnimeResponseData {
    spotlight: SpotlightAnime[];
    trending: TrendingAnime[];
    topAiring: CommonAnimeCard[];
    mostPopular: CommonAnimeCard[];
    mostFavorite: CommonAnimeCard[];
    latestCompleted: CommonAnimeCard[];
    latestEpisode: CommonAnimeCard[];
    newAdded: CommonAnimeCard[];
    topUpcoming: CommonAnimeCard[];
    top10: Top10;
    genres: string[];
}
export interface HomeApiResponse {
    success: boolean;
    data: AnimeResponseData;
}