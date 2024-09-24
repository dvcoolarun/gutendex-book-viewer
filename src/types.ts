export interface Book {
    id: number;
    title: string;
    authors: Array<{
        name: string;
        birth_year: number;
        death_year: number;
    }>;
    formats: {
        [key: string]: string;
    };
    download_count: number; 
}

export interface ApiResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}