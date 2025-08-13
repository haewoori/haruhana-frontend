'use server';

import createServerInstance from '../../axiosServerInstance';
import { CreateStudyRequest, CreateStudyResponse } from './types';

/**
 * 서버에서 새 스터디 생성 API
 * @param title - 스터디 제목
 * @param content - 스터디 내용
 * @param dueDate - 모집 마감일
 * @param category - 스터디 카테고리 (CERTIFICATE, HOBBY)
 * @param isOnline - 온라인 여부
 * @returns 응답 없음
 */
export const createStudyServer = async (
  title: string,
  content: string,
  dueDate: string,
  category: 'CERTIFICATE' | 'HOBBY',
  isOnline: boolean
): Promise<void> => {
  const requestData: CreateStudyRequest = {
    title,
    content,
    dueDate,
    category,
    isOnline
  };

  try {
    const api = createServerInstance();
    await api.post<CreateStudyResponse>('/api/v1/study/create', requestData);
  } catch (error) {
    console.error('서버에서 스터디 생성 중 오류 발생:', error);
    throw error;
  }
};