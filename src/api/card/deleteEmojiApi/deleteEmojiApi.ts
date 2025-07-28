'use server';

import createServerInstance from '../../axiosServerInstance';
import { DeleteEmojiRequest, DeleteEmojiResponse } from './types';

/**
 * 서버에서 카드에 이모지 삭제 API
 * @param cardId - 이모지를 삭제할 카드 ID
 * @param emojiId - 삭제할 이모지 ID
 * @returns 응답 없음
 */
export const deleteEmojiServer = async (cardId: string, emojiId: string): Promise<void> => {
  const requestData: DeleteEmojiRequest = {
    cardId,
    emojiId
  };

  try {
    const api = createServerInstance();
    await api.delete<DeleteEmojiResponse>('/api/v1/card/emoji/delete', {
      data: requestData
    });
  } catch (error) {
    console.error('서버에서 이모지 삭제 중 오류 발생:', error);
    throw error;
  }
};