'use server';

import createServerInstance from '../../axiosServerInstance';
import { GetEmojiListResponse } from './types';

/**
 * 서버에서 이모지 리스트 조회 API
 * @returns 이모지 리스트 데이터
 */
export const getEmojiListServer = async (): Promise<GetEmojiListResponse> => {
  try {
    const api = createServerInstance();
    const response = await api.get<GetEmojiListResponse>('/api/v1/card/emoji/data/list');
    return response.data;
  } catch (error) {
    console.error('서버에서 이모지 리스트 조회 중 오류 발생:', error);
    throw error;
  }
};