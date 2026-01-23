export interface ScheduleData {
    id: string;
    title: string;
    alternativeTitle: string;
    time: string;
    episode: number;
}

export interface ScheduleApiResponse {
    success: boolean;
    data: {
        mata: {
            date: string;
        }
        response: ScheduleData[];
    }
}

export interface ScheduleOneApiResponse{
    success: boolean;
    data: {
        time: string;
    }
}
