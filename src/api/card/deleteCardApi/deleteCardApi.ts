'use server';

import createServerInstance from '../../axiosServerInstance';
import { DeleteCardResponse } from './types';

/**
 * 서버에서 카드 삭제 API
 * @param cardId - 삭제할 카드 ID
 * @returns 응답 없음
 */
export const deleteCardServer = async (cardId: string): Promise<void> => {
    try {
        const api = createServerInstance();
        await api.delete<DeleteCardResponse>(`/api/v1/card/delete/${cardId}`);
    } catch (error) {
        console.error('서버에서 카드 삭제 중 오류 발생:', error);
        throw error;
    }
};