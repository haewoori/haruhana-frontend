'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

// 서버용 공통 axios 인스턴스
const createServerInstance = () => {
    const cookieStore = cookies();
    const cookieString = cookieStore
        .getAll()
        .map(c => `${c.name}=${c.value}`)
        .join('; ');

    const accessToken = cookieStore.get('access_token')?.value;
    const headers: Record<string, string> = {
        Cookie: cookieString,
    };

    if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
    }

    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
        headers,
        withCredentials: true,
    });
};

export default createServerInstance;