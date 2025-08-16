'use server';

import createServerInstance from '../../axiosServerInstance';
import { GetStudiesParams, GetStudiesResponse } from './types';

/**
 * 서버에서 스터디 리스트를 조회하는 API
 * @param params - 조회 파라미터 (모집 여부, 페이지 정보)
 * @returns 스터디 리스트와 페이지 정보
 */
export const getStudiesServer = async (params?: GetStudiesParams): Promise<GetStudiesResponse> => {
  try {
    const api = createServerInstance();
    const response = await api.get<GetStudiesResponse>('/api/v1/study/list', { params });
    return response.data;
  } catch (error) {
    console.error('서버에서 스터디 리스트를 가져오는 중 오류 발생:', error);
    throw error;
  }
};