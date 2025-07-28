import api from '../../axiosInstance';
import { AddEmojiRequest, AddEmojiResponse } from './types';

/**
 * 카드에 이모지 추가 API
 * @param cardId - 이모지를 추가할 카드 ID
 * @param emojiId - 추가할 이모지 ID
 * @returns 응답 없음
 */
export const addEmoji = async (cardId: string, emojiId: string): Promise<void> => {
  const requestData: AddEmojiRequest = {
    cardId,
    emojiId
  };

  try {
    await api.post<AddEmojiResponse>('/api/v1/card/emoji/add', requestData);
  } catch (error) {
    console.error('이모지 추가 중 오류 발생:', error);
    throw error;
  }
};