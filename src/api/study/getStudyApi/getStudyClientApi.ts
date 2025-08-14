import api from '../../axiosInstance';
import { GetStudiesParams, GetStudiesResponse } from './types';

/**
 * 클라이언트에서 스터디 리스트를 조회하는 API
 * @param params - 조회 파라미터 (모집 여부, 페이지 정보)
 * @returns 스터디 리스트와 페이지 정보
 */
export const getStudies = async (params?: GetStudiesParams): Promise<GetStudiesResponse> => {
  try {
    const response = await api.get<GetStudiesResponse>('/api/v1/study/list', { params });
    return response.data;
  } catch (error) {
    console.error('스터디 리스트를 가져오는 중 오류 발생:', error);
    throw error;
  }
};