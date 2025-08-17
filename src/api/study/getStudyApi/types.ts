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
  maxParticipants: number;    // 최대 참여 인원
  category: StudyType;        // 스터디 타입 (자격증, 취미)
  createdTime: string;
  updatedTime: string;
  dueDate: string;
  online: boolean;
  available: boolean;         // 모집 중(true) / 모집 완료(false)
  participantIds: string[];   // 참여자 ID 목록
  participantNames: string[]; // 참여자 이름 목록
  participated: boolean;      // 참여 여부
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