export interface Episode {
    id: string;
    title: string;
    episodeNumber: number;
    isFiller?: boolean;
    alternativeTitle?: string;
}

export interface EpisodesApiResponse {
    success: boolean;
    data: Episode[];
}