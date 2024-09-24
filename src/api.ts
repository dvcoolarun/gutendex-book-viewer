import { Book, ApiResponse } from './types';

const API_BASE_URL = 'http://skunkworks.ignitesol.com:8000';

export const fetchBook = async (
    category: string,
    searchTerm: string,
    mimeType: string,
): Promise<Book[]> => {
    const params = new URLSearchParams({
        topic: category,
        search: searchTerm,
        mime_type: mimeType,
    });

    const response = await fetch(`${API_BASE_URL}/books/?${params.toString()}`);
    if (!response.ok) {
        throw new Error('Failed to fetch books');
    }
    
    const data = await response.json() as ApiResponse<Book>;
    return data.results;
};