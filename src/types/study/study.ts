export enum StudyStatusType {
  RECRUITING = 'recruiting',
  COMPLETED = 'completed'
}

export type StudyFilterStatusType = StudyStatusType | 'all';

export enum StudyType {
  CERTIFICATE = 'CERTIFICATE',
  HOBBY = 'HOBBY'
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
  studyCardId: string;
  title: string;
  content: string;
  author: StudyAuthor;
  totalMembers: number;
  startDate: string;
  type: StudyType;
  deadline: string;
  isOnline: boolean;
  status: StudyStatusType;
  participantIds: string[];
  participantNames: string[];
  participated: boolean;
  mine: boolean;
  currentMembers: number;
  members: StudyMember[];
}

// 스터디 필터 인터페이스
export interface StudyFilters {
  status: StudyFilterStatusType;
}