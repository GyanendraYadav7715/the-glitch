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
    type?: AnimeType | string;
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


//Search Api Response type //
export interface PageInfo {
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
}

export interface SearchAnimeCard extends BaseAnime {
    episodes: EpisodeInfo;
    type?: AnimeType | string;
    duration: string;
}

export interface SearchApiResponseData {
    pageInfo: PageInfo;
    response: SearchAnimeCard[];

}
export interface SearchApiResponse {
    success: boolean;
    data: SearchApiResponseData;
}

//Deatiled pages //
export interface season extends BaseAnime {
    isActive: boolean;
}
export interface recommendedData extends CommonAnimeCard {
    duration: string;
    is18Plus: boolean;
}
export interface DetailedApiResponseData extends recommendedData {
    aired: {
        from: string;
        to: string;
    };
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
export interface DetailedApiResponse {
    success: boolean;
    data: DetailedApiResponseData;
}


//Character Detailed //
export interface VoiceActor {
    id: string;
    name: string;
    imageUrl: string,
    cast: string | null;
}

export interface Character {
    id: string;
    name: string;
    imageUrl: string;
    role: string;
    voiceActors: VoiceActor[];
}
export interface CharactersApiResponse {
    success: boolean;
    data: {
        pageInfo: PageInfo;
        response: Character[];

    }

}

// Single Charecter Resposnse //

export interface AnimeAppearances {
    title: string;
    alternativeTitle: string;
    id: string;
    poster: string;
    role: string;
    type: AnimeType | string;
}
export interface CharacterApiResponse {
    name: string;
    type: string;
    japanese: string;
    imageUrl: string;
    bio: string;
    animeAppearances: AnimeAppearances[];
}

export interface VoiceActorDeatieldApiResposne{
    success: boolean;
    data: {
        id: string;
        name: string;
        imageUrl: string,
    }

}


