// src/services/animeService.ts

export interface Episode {
    id: string;
    title: string;
    episodeNumber: number;
    isFiller?: boolean;
    alternativeTitle?: string;
    // Add other fields from your JSON if needed
}

export interface ApiResponse {
    success: boolean;
    data: Episode[];
}

export const fetchAnimeEpisodes = async (animeId: string): Promise<Episode[]> => {
    try {
        const res = await fetch(`http://localhost:3030/api/v1/episodes/${animeId}`);

        if (!res.ok) {
            throw new Error(`Error fetching episodes: ${res.statusText}`);
        }

        const json: ApiResponse = await res.json();
        return json.data || []; // Return just the array of episodes
    } catch (error) {
        console.error("Failed to load episodes:", error);
        return [];
    }
};