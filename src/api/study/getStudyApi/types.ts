// API 요청 파라미터 타입
import {StudyType} from "@/types/study/study";

export interface GetStudiesParams {
  available?: boolean;  // 모집 중(true) / 모집 완료(false) / 전체(undefined)
  page?: number;
  size?: number;
  sort?: string;
}

// API 응답 중 페이지 정보 타입
export interface PageInfo {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
}

// API 응답 중 사용자 프로필 타입
export interface UserProfile {
  username: string;
  profileImageUrl: string;
}

// API 응답 중 스터디 카드 항목 타입
export interface StudyCardItem {
  studyCardId: string;
  title: string;
  content: string;
  userProfile: UserProfile;
  type: StudyType;
  createdTime: string;
  updatedTime: string;
  dueDate: string;
  online: boolean;
  available: boolean;
  registered: boolean;
  participated: boolean;
  mine: boolean;
}

// API 응답 전체 타입
export interface GetStudiesResponse {
  result: {
    content: StudyCardItem[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: PageInfo;
    size: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    totalElements: number;
    totalPages: number;
  };
}