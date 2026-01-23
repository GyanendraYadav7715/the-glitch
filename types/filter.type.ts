import { PageInfo, SearchAnimeCard } from "./home.type";
export interface filterApiResposne {
    success: boolean;
    data: {
        pageInfo: PageInfo;
        response: SearchAnimeCard[];

    }
}