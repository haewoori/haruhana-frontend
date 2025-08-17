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
    title: studyCard.title,
    content: studyCard.content,
    author: {
      id: studyCard.userProfile.username, // id 넘어오지 않고있음. 따라서 username을 id로 사용
      name: studyCard.userProfile.username,
      profileImage: studyCard.userProfile.profileImageUrl || 'https://placehold.co/600x400?text=user'
    },
    totalMembers: studyCard.maxParticipants,
    startDate: studyCard.createdTime.split('T')[0],
    type: studyCard.category,
    deadline: studyCard.dueDate,
    isOnline: studyCard.online,
    status: studyCard.available ? StudyStatusType.RECRUITING : StudyStatusType.COMPLETED,
    participantIds: studyCard.participantIds || [],
    participantNames: studyCard.participantNames || [],
    participated: studyCard.participated,
    mine: studyCard.mine,
    currentMembers: studyCard.participantNames.length,

    members: studyCard.participantIds.map((id, index) => ({
        id,
        name: studyCard.participantNames[index] || '알 수 없는 사용자',
    })),
  };
};