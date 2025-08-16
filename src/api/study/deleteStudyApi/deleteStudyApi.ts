'use server';

import createServerInstance from '../../axiosServerInstance';
import { DeleteStudyResponse } from './types';

/**
 * 서버에서 스터디 카드 삭제 API
 * @param studyCardId - 삭제할 스터디 카드 ID
 * @returns 응답 없음
 */
export const deleteStudyServer = async (studyCardId: string): Promise<void> => {
  try {
    const api = createServerInstance();
    await api.delete<DeleteStudyResponse>(`/api/v1/study/delete/${studyCardId}`);
  } catch (error) {
    console.error('서버에서 스터디 카드 삭제 중 오류 발생:', error);
    throw error;
  }
};