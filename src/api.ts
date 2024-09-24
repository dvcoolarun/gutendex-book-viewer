import { ApiResponse } from './types';

export const fetchBook = async (url: string): Promise<ApiResponse> => {

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch books');
    }
    
    return response.json()
};