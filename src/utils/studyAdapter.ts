import { StudyCardItem } from '@/api/study/getStudyApi/types';
import { Study, StudyStatusType, StudyType } from '@/types/study/study';

/**
 * API로부터 받은 StudyCardItem을 애플리케이션에서 사용하는 Study 타입으로 변환
 * @param studyCard - API 응답의 스터디 카드 항목
 * @returns 변환된 Study 객체
 */
export const adaptStudyCardToStudy = (studyCard: StudyCardItem): Study => {
  return {
    id: studyCard.studyCardId,
    studyCardId: studyCard.studyCardId,
    status: studyCard.available ? StudyStatusType.RECRUITING : StudyStatusType.COMPLETED,
    type: studyCard.type,
    isOnline: studyCard.online,
    author: {
      id: studyCard.userProfile.username, // 실제 id가 없으므로 username을 id로 사용
      name: studyCard.userProfile.username,
      profileImage: studyCard.userProfile.profileImageUrl || 'https://randomuser.me/api/portraits/men/32.jpg' // 기본 이미지 제공
    },
    title: studyCard.title,
    currentMembers: 1, // API에서 제공하지 않음, 기본값 설정
    totalMembers: 10, // API에서 제공하지 않음, 기본값 설정
    startDate: new Date().toISOString().split('T')[0], // API에서 제공하지 않음, 현재 날짜로 설정
    deadline: studyCard.dueDate,
    description: studyCard.content,
    members: [{ id: studyCard.userProfile.username, name: studyCard.userProfile.username }], // 작성자만 멤버로 추가
    isApplied: studyCard.registered
  };
};