 
export interface Movie {
    id: string;
    title: string;
    poster: string;
    duration: string;
    type: string; // e.g., 'Movie', 'TV'
    sub?: number;
    dub?: number;
    episodes?: number;
    quality?: string; // e.g., 'HD'
}