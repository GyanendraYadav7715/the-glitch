import { API_CONFIG } from "@/config/api-config";

export async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
        ...options,
        next: {
            revalidate: API_CONFIG.CACHE_TIME,
            ...options?.next
        },
    });

    if (!response.ok) {
         throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
}