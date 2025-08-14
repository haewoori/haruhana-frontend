export enum StudyStatusType {
  RECRUITING = 'recruiting',
  COMPLETED = 'completed'
}

export type StudyFilterStatusType = StudyStatusType | 'all';

export enum StudyType {
  CERTIFICATE = 'certificate',
  HOBBY = 'hobby'
}

export type ApiStudyCategory = 'CERTIFICATE' | 'HOBBY';

// StudyType을 API 카테고리로 변환하는 함수
export function studyTypeToApiCategory(type: StudyType): ApiStudyCategory {
  switch(type) {
    case StudyType.CERTIFICATE:
      return 'CERTIFICATE';
    case StudyType.HOBBY:
      return 'HOBBY';
    default:
      throw new Error(`Invalid study type: ${type}`);
  }
}

// API 카테고리를 StudyType으로 변환하는 함수
export function apiCategoryToStudyType(category: ApiStudyCategory): StudyType {
  switch(category) {
    case 'CERTIFICATE':
      return StudyType.CERTIFICATE;
    case 'HOBBY':
      return StudyType.HOBBY;
    default:
      throw new Error(`Invalid API category: ${category}`);
  }
}

// 문자열을 StudyType으로 변환하는 유틸리티 함수
export function parseStudyType(typeString: string): StudyType {
  switch(typeString.toLowerCase()) {
    case 'certificate':
      return StudyType.CERTIFICATE;
    case 'hobby':
      return StudyType.HOBBY;
    default:
      throw new Error(`Invalid study type: ${typeString}`);
  }
}

// StudyType을 표시 텍스트로 변환하는 함수
export function getStudyTypeDisplayText(type: StudyType): string {
  switch(type) {
    case StudyType.CERTIFICATE:
      return '자격증';
    case StudyType.HOBBY:
      return '취미';
    default:
      return '알 수 없음';
  }
}

// StudyStatusType을 표시 텍스트로 변환하는 함수
export function getStudyStatusDisplayText(status: StudyStatusType): string {
  switch(status) {
    case StudyStatusType.RECRUITING:
      return '모집 중';
    case StudyStatusType.COMPLETED:
      return '모집 완료';
    default:
      return '알 수 없음';
  }
}

// 멤버 타입
export interface StudyMember {
  id: string;
  name: string;
}

// 스터디 저자 타입
export interface StudyAuthor {
  id: string;
  name: string;
  profileImage: string;
}

// 스터디 인터페이스
export interface Study {
  id: string;
  status: StudyStatusType;
  type: StudyType;
  isOnline: boolean;
  author: StudyAuthor;
  title: string;
  currentMembers: number;
  totalMembers: number;
  startDate: string;
  deadline: string;
  description: string;
  members: StudyMember[];
  isApplied: boolean;
}

// 스터디 필터 인터페이스
export interface StudyFilters {
  status: StudyFilterStatusType;
}