import api from '../../axiosInstance';
import { CancelStudyRequest, CancelStudyResponse } from './types';

/**
 * 클라이언트에서 스터디 신청을 취소하는 API
 * @param studyCardId - 취소할 스터디 카드 ID
 * @returns 취소 성공 여부와 참여 상태
 */
export const cancelStudy = async (studyCardId: string): Promise<CancelStudyResponse> => {
  try {
    const response = await api.post<CancelStudyResponse>(
      '/api/v1/study/cancel',
      { studyCardId }
    );
    return response.data;
  } catch (error) {
    console.error('스터디 신청 취소 중 오류 발생:', error);
    throw error;
  }
};