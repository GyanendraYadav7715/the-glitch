import { PageInfo, AnimeType } from "./home.type"

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

export interface VoiceActorDeatieldApiResposne {
    success: boolean;
    data: {
        id: string;
        name: string;
        imageUrl: string,
    }

}