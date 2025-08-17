import api from '../../axiosInstance';
import { CreateStudyRequest, CreateStudyResponse } from './types';
import {StudyType} from "@/types/study/study";

/**
 * 새 스터디 생성 API
 * @param title - 스터디 제목
 * @param content - 스터디 내용
 * @param maxParticipants - 최대 참여 인원
 * @param dueDate - 모집 마감일
 * @param category - 스터디 카테고리 (CERTIFICATE, HOBBY)
 * @param isOnline - 온라인 여부
 * @returns 응답 없음
 */
export const createStudy = async (
  title: string,
  content: string,
  maxParticipants: number,
  dueDate: string,
  category: StudyType,
  isOnline: boolean
): Promise<void> => {
  const requestData: CreateStudyRequest = {
    title,
    content,
    maxParticipants,
    dueDate,
    category,
    isOnline
  };

  try {
    await api.post<CreateStudyResponse>('/api/v1/study/create', requestData);
  } catch (error) {
    console.error('스터디 생성 중 오류 발생:', error);
    throw error;
  }
};