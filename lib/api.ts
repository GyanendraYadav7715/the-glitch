// src/lib/api.ts

const BASE_URL = "http://localhost:3030/api/v1";

async function fetcher(endpoint: string, options?: RequestInit) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        next: { revalidate: 3600 },
        ...options,
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
}

export async function getHomeData() {
    try {
        return await fetcher("/home");
    } catch (error) {
        console.error("getHomeData failed:", error);
        return {
            success: false,
            data: { spotlight: [], trending: [] }
        };
    }
}