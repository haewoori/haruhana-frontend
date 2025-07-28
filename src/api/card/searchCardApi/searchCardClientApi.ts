import api from '../../axiosInstance';
import { GetCardsParams, GetCardsResponse } from './types';
import { formatDateToString } from '@/utils/dateUtils';

/**
 * 특정 날짜에 해당하는 카드 목록 조회
 * @param date - 조회할 날짜 (Date 객체)
 * @returns 내 카드와 다른 사람 카드 목록
 */
export const getCards = async (date: Date): Promise<GetCardsResponse> => {
    const formattedDate = formatDateToString(date);
    const params: GetCardsParams = { date: formattedDate };

    try {
        const response = await api.get<GetCardsResponse>('/api/v1/card/get', {
            params,
        });
        return response.data;
    } catch (error) {
        console.error('카드 목록을 가져오는 중 오류 발생:', error);
        throw error;
    }
};