import api from '../../axiosInstance';
import { GetEmojiListResponse } from './types';

/**
 * 이모지 리스트 조회 API
 * @returns 이모지 리스트 데이터
 */
export const getEmojiList = async (): Promise<GetEmojiListResponse> => {
  try {
    const response = await api.get<GetEmojiListResponse>('/api/v1/card/emoji/data/list');
    return response.data;
  } catch (error) {
    console.error('이모지 리스트 조회 중 오류 발생:', error);
    throw error;
  }
};