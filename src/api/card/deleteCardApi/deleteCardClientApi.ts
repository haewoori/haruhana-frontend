import api from '../../axiosInstance';
import { DeleteCardResponse } from './types';

/**
 * 카드 삭제 API
 * @param cardId - 삭제할 카드 ID
 * @returns 응답 없음
 */
export const deleteCard = async (cardId: string): Promise<void> => {
    try {
        await api.delete<DeleteCardResponse>(`/api/v1/card/delete/${cardId}`);
    } catch (error) {
        console.error('카드 삭제 중 오류 발생:', error);
        throw error;
    }
};