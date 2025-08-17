'use server';

import createServerInstance from '../../axiosServerInstance';
import { ApplyStudyRequest, ApplyStudyResponse } from './types';

/**
 * 서버에서 스터디 신청을 하는 API
 * @param studyCardId - 신청할 스터디 카드 ID
 * @returns 신청 성공 여부와 참여 상태
 */
export const applyStudyServer = async (studyCardId: string): Promise<ApplyStudyResponse> => {
  try {
    const api = createServerInstance();
    const request: ApplyStudyRequest = { studyCardId };
    const response = await api.post<ApplyStudyResponse>('/api/v1/study/apply', request);
    return response.data;
  } catch (error) {
    console.error('서버에서 스터디 신청 중 오류 발생:', error);
    throw error;
  }
};