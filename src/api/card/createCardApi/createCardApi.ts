'use server';

import createServerInstance from '../../axiosServerInstance';
import { CreateCardRequest, CreateCardResponse } from './types';
import { convertColorIdToHex } from '@/utils/colorUtils';

/**
 * 서버에서 새 카드 생성 API
 * @param content - 카드 내용
 * @param colorId - 카드 색상 ID (blue, green 등)
 * @returns 응답 없음
 */
export const createCardServer = async (content: string, colorId: string): Promise<void> => {
    const bgColor = convertColorIdToHex(colorId);

    const requestData: CreateCardRequest = {
        content,
        bgColor
    };

    try {
        const api = createServerInstance();
        await api.post<CreateCardResponse>('/api/v1/card/create', requestData);
    } catch (error) {
        console.error('서버에서 카드 생성 중 오류 발생:', error);
        throw error;
    }
};