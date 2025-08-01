import api from '../../axiosInstance';
import { GetNotificationsResponse } from './types';

/**
 * 공지사항 조회 API
 * @returns 공지사항 메시지 정보
 */
export const getNotifications = async (): Promise<GetNotificationsResponse> => {
  try {
    const response = await api.get<GetNotificationsResponse>('/api/v1/notifications/get');
    return response.data;
  } catch (error) {
    console.error('공지사항 조회 중 오류 발생:', error);
    throw error;
  }
};