import api from '../../axiosInstance';
import { DeleteEmojiRequest, DeleteEmojiResponse } from './types';

/**
 * 카드에서 이모지 삭제 API
 * @param cardId - 이모지를 삭제할 카드 ID
 * @param emojiId - 삭제할 이모지 ID
 * @returns 응답 없음
 */
export const deleteEmoji = async (cardId: string, emojiId: string): Promise<void> => {
  const requestData: DeleteEmojiRequest = {
    cardId,
    emojiId
  };

  try {
    await api.delete<DeleteEmojiResponse>('/api/v1/card/emoji/delete', {
      data: requestData
    });
  } catch (error) {
    console.error('이모지 삭제 중 오류 발생:', error);
    throw error;
  }
};