'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import {
    MdCampaign,
    MdEdit,
    MdPerson,
    MdCalendarToday,
    MdCheck,
    MdAccessTime,
    MdClose,
    MdInfo,
    MdFilterList,
    MdFilterAlt,
    MdClear
} from 'react-icons/md';

import { useToast } from '@/hooks/useToast';
import { ToastContainer } from '@/components/Toast';
import StudyModal from './StudyModal';
import StudyCreateModal, { StudyFormData } from '@/components/StudyCreateModal/StudyCreateModal';
import { formatDate } from '@/utils/dateUtils';

import Header from '@/components/Header/Header';
import PageHeader from '@/components/PageHeader/PageHeader';
import AnnouncementBox from '@/components/AnnouncementBox/AnnouncementBox';
import FloatingButton from '@/components/FloatingButton/FloatingButton';

import {
    StudyContainer,
    StudyContentWrapper,
    MainContent,
    StudyListContainer,
    StudyCard,
    CardHeader,
    CardBody,
    CardFooter,
    StatusTag,
    TagsContainer,
    StudyTypeTag,
    OnlineTag,
    ProfileSection,
    ProfileImage,
    UserInfo,
    UserName,
    StudyTitle,
    StudyInfoContainer,
    MemberCount,
    MemberCountValue,
    Deadline,
    DeadlineValue,
    LoadingContainer,
    LoadingSpinner,
    EmptyStateText,
    ErrorText,
    colors,
    StatusIndicator,
    ApplyBadge,
    CardActions,
    ViewDetailsButton, FilterButton, FilterContainer, FilterBadge, FilterDivider, ClearFiltersButton
} from './page.style';

interface Member {
    id: string;
    name: string;
}

interface Study {
    id: string;
    status: 'recruiting' | 'completed' | 'canceled';
    type: 'certificate' | 'hobby';
    isOnline: boolean;
    author: {
        id: string;
        name: string;
        profileImage: string;
    };
    title: string;
    currentMembers: number;
    totalMembers: number;
    startDate: string;
    deadline: string;
    description: string;
    members: Member[];
    isApplied: boolean;
}

type StudyStatus = 'all' | 'recruiting' | 'completed' | 'canceled';

interface StudyFilters {
    status: StudyStatus;
}

// 임시 스터디 데이터
const MOCK_STUDIES: Study[] = [
    {
        id: '1',
        status: 'recruiting',
        type: 'certificate',
        isOnline: true,
        author: {
            id: '101',
            name: '김우리',
            profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        title: '정보처리기사 스터디',
        currentMembers: 3,
        totalMembers: 10,
        startDate: '2025-08-01',
        deadline: '2025-08-31',
        description: '정보처리기사 자격증 취득을 위한 스터디입니다.\n\n매주 화요일 저녁 8시에 온라인으로 모여서 기출문제를 풀고 함께 공부하는 방식으로 진행됩니다.\n\n함께 공부하며 올해 안에 자격증 취득을 목표로 하고 있습니다!',
        members: [
            { id: '101', name: '김우리' },
            { id: '102', name: '이하나' },
            { id: '103', name: '박민수' }
        ],
        isApplied: false
    },
    {
        id: '2',
        status: 'recruiting',
        type: 'hobby',
        isOnline: false,
        author: {
            id: '102',
            name: '이하나',
            profileImage: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        title: '주말 독서모임',
        currentMembers: 5,
        totalMembers: 8,
        startDate: '2025-08-10',
        deadline: '2025-08-20',
        description: '매주 토요일 오후 2시에 강남역 인근 카페에서 모여 함께 책을 읽고 이야기를 나누는 모임입니다.\n\n다양한 장르의 책을 함께 읽으며 서로의 생각을 나누고 싶어요.\n\n첫 모임은 8월 마지막 주 토요일에 진행될 예정입니다.',
        members: [
            { id: '102', name: '이하나' },
            { id: '104', name: '최지원' },
            { id: '105', name: '정승호' },
            { id: '106', name: '한미영' },
            { id: '107', name: '오준석' }
        ],
        isApplied: true
    },
    {
        id: '3',
        status: 'completed',
        type: 'certificate',
        isOnline: true,
        author: {
            id: '103',
            name: '박민수',
            profileImage: 'https://randomuser.me/api/portraits/men/62.jpg'
        },
        title: 'SQLD 자격증 스터디',
        currentMembers: 7,
        totalMembers: 7,
        startDate: '2025-07-01',
        deadline: '2025-07-20',
        description: 'SQLD 자격증 취득을 위한 스터디입니다. 모집이 완료되었습니다.\n\n매주 월, 수, 금 저녁 9시에 온라인으로 모여 SQL 문제를 풀고 있습니다.\n\n9월 시험을 목표로 준비 중입니다.',
        members: [
            { id: '103', name: '박민수' },
            { id: '108', name: '김태호' },
            { id: '109', name: '이서연' },
            { id: '110', name: '장윤성' },
            { id: '111', name: '황지영' },
            { id: '112', name: '노현우' },
            { id: '113', name: '임수진' }
        ],
        isApplied: false
    },
    {
        id: '4',
        status: 'recruiting',
        type: 'hobby',
        isOnline: true,
        author: {
            id: '104',
            name: '최지원',
            profileImage: 'https://randomuser.me/api/portraits/women/28.jpg'
        },
        title: '영어 회화 스터디',
        currentMembers: 4,
        totalMembers: 6,
        startDate: '2025-08-15',
        deadline: '2025-09-15',
        description: '일상 영어 회화 실력 향상을 위한 스터디입니다.\n\n매주 목요일 저녁 7시에 온라인으로 모여 다양한 주제로 영어 대화를 나누는 방식으로 진행됩니다.\n\n부담 없이 참여하셔서 함께 영어 실력을 향상시켜요!',
        members: [
            { id: '104', name: '최지원' },
            { id: '106', name: '한미영' },
            { id: '114', name: '강동훈' },
            { id: '115', name: '정소연' }
        ],
        isApplied: false
    }
];

const StudyClient = () => {
    const router = useRouter();
    const { accessToken, isAuthenticated } = useSelector((state: any) => state.auth);

    const [currentDate, setCurrentDate] = useState(new Date());
    const [studies, setStudies] = useState<Study[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);
    const [showStudyModal, setShowStudyModal] = useState(false);
    const [notification, setNotification] = useState<string | null>("여러분의 영업점 생활을 응원합니다 :)");
    const [showCreateModal, setShowCreateModal] = useState(false);

    const [filters, setFilters] = useState<StudyFilters>({
        status: 'all'
    });
    const { toasts, showToast, hideToast } = useToast();

    // 인증 체크
    useEffect(() => {
        if (!accessToken) {
            router.push('/');
        }
    }, [isAuthenticated, accessToken, router]);

    // 스터디 데이터 로드 (실제로는 API 호출)
    useEffect(() => {
        const fetchStudies = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // 실제 구현에서는 API 호출로 대체
                // const response = await getStudies();
                // setStudies(response);

                // 목업 데이터 사용
                setTimeout(() => {
                    setStudies(MOCK_STUDIES);
                    setIsLoading(false);
                }, 800);
            } catch (err) {
                console.error('스터디 데이터를 불러오는 중 오류가 발생했습니다:', err);
                setError('스터디 데이터를 불러오는 중 오류가 발생했습니다. 새로고침 해주세요.');
                setStudies([]);
                setIsLoading(false);
            }
        };

        fetchStudies();
    }, []);

    // 날짜 필터링 함수
    const isDateInRange = useCallback((study: Study, date: Date) => {
        const selectedDate = new Date(date);
        selectedDate.setHours(0, 0, 0, 0);

        const startDate = new Date(study.startDate);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(study.deadline);
        endDate.setHours(0, 0, 0, 0);

        return selectedDate >= startDate && selectedDate <= endDate;
    }, []);

    // 필터링된 스터디 목록 반환 함수
    const getFilteredStudies = useCallback(() => {
        const dateFiltered = studies.filter(study => isDateInRange(study, currentDate));

        if (filters.status === 'all') {
            return dateFiltered;
        }

        return dateFiltered.filter(study => study.status === filters.status);
    }, [studies, filters, currentDate, isDateInRange]);

    // 필터 버튼 클릭 핸들러
    const handleFilterChange = useCallback((status: StudyStatus) => {
        setFilters(prev => ({
            ...prev,
            status: status
        }));
    }, []);

    // 필터 초기화 핸들러
    const clearFilters = useCallback(() => {
        setFilters({
            status: 'all'
        });
    }, []);

    // 각 상태별 스터디 개수 계산
    const getStudyCountByStatus = useCallback((status: StudyStatus): number => {
        const dateFiltered = studies.filter(study => isDateInRange(study, currentDate));

        if (status === 'all') {
            return dateFiltered.length;
        }
        return dateFiltered.filter(study => study.status === status).length;
    }, [studies, currentDate, isDateInRange]);

    // 필터 렌더링 함수
    const renderFilters = () => (
        <FilterContainer>
            <FilterButton
                active={filters.status === 'all'}
                onClick={() => handleFilterChange('all')}
            >
                <MdFilterList size={16} />
                전체
                <FilterBadge>{getStudyCountByStatus('all')}</FilterBadge>
            </FilterButton>

            <FilterButton
                active={filters.status === 'recruiting'}
                onClick={() => handleFilterChange('recruiting')}
            >
                <MdAccessTime size={16} />
                모집 중
                <FilterBadge>{getStudyCountByStatus('recruiting')}</FilterBadge>
            </FilterButton>

            <FilterButton
                active={filters.status === 'completed'}
                onClick={() => handleFilterChange('completed')}
            >
                <MdCheck size={16} />
                모집 완료
                <FilterBadge>{getStudyCountByStatus('completed')}</FilterBadge>
            </FilterButton>

            <FilterButton
                active={filters.status === 'canceled'}
                onClick={() => handleFilterChange('canceled')}
            >
                <MdClose size={16} />
                모집 취소
                <FilterBadge>{getStudyCountByStatus('canceled')}</FilterBadge>
            </FilterButton>

            {filters.status !== 'all' && (
                <>
                    <FilterDivider />
                    <ClearFiltersButton onClick={clearFilters}>
                        <MdClear size={16} />
                        필터 초기화
                    </ClearFiltersButton>
                </>
            )}
        </FilterContainer>
    );

    // 스터디 신청 함수
    const handleApplyStudy = useCallback((studyId: string) => {
        // 실제 구현에서는 API 호출
        // await applyStudy(studyId);

        setStudies(prevStudies =>
            prevStudies.map(study =>
                study.id === studyId ? { ...study, isApplied: true, currentMembers: study.currentMembers + 1 } : study
            )
        );

        setShowStudyModal(false);
        showToast('스터디 신청이 완료되었습니다.', 'success');
    }, [showToast]);

    // 스터디 신청 취소 함수
    const handleCancelApply = useCallback((studyId: string) => {
        // 실제 구현에서는 API 호출
        // await cancelStudyApplication(studyId);

        setStudies(prevStudies =>
            prevStudies.map(study =>
                study.id === studyId ? { ...study, isApplied: false, currentMembers: study.currentMembers - 1 } : study
            )
        );

        setShowStudyModal(false);
        showToast('스터디 신청이 취소되었습니다.', 'info');
    }, [showToast]);

    // 스터디 카드 클릭 시 모달 열기
    const openStudyModal = useCallback((study: Study) => {
        setSelectedStudy(study);
        setShowStudyModal(true);
    }, []);

    // 모달 닫기
    const closeStudyModal = useCallback(() => {
        setShowStudyModal(false);
        setSelectedStudy(null);
    }, []);

    // 새 스터디 생성 모달 열기
    const handleCreateStudy = useCallback(() => {
        setShowCreateModal(true);
    }, []);

    // 새 스터디 생성 모달 닫기
    const handleCloseCreateModal = useCallback(() => {
        setShowCreateModal(false);
    }, []);

    // 새 스터디 저장 핸들러
    const handleSaveStudy = useCallback((studyData: StudyFormData) => {
        // 실제 구현에서는 API 호출
        // await createStudy(studyData);

        // 현재 사용자 정보 (실제로는 Redux 또는 Context에서 가져옴)
        const currentUser = {
            id: '101', // 임시 사용자 ID
            name: '김우리',
            profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
        };

        // 새 스터디 객체 생성
        const newStudy: Study = {
            id: Date.now().toString(), // 임시 ID 생성
            status: 'recruiting',
            type: studyData.type,
            isOnline: studyData.isOnline,
            author: currentUser,
            title: studyData.title,
            currentMembers: 1, // 생성자가 첫 번째 멤버
            totalMembers: studyData.totalMembers,
            startDate: studyData.startDate,
            deadline: studyData.deadline,
            description: studyData.description,
            members: [{ id: currentUser.id, name: currentUser.name }],
            isApplied: true // 생성자는 자동으로 참여됨
        };

        // 스터디 목록에 추가
        setStudies(prevStudies => [newStudy, ...prevStudies]);

        // 모달 닫기
        setShowCreateModal(false);

        // 성공 메시지 표시
        showToast('스터디가 성공적으로 생성되었습니다.', 'success');
    }, [showToast]);

    // 날짜에 따른 필터링된 스터디 수 확인
    const dateFilteredStudiesCount = studies.filter(study => isDateInRange(study, currentDate)).length;

    // 최종 필터링된 스터디 목록 가져오기
    const filteredStudies = getFilteredStudies();

    return (
        <StudyContainer>
            <Header
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                colors={colors}
            />
            <StudyContentWrapper>
                <MainContent>
                    <PageHeader
                        groupTitle="우리은행 25년도 7월 행번"
                        gradientText="함께 성장해요⚡️"
                        colors={colors}
                    />

                    <AnnouncementBox
                        message={notification || "여러분의 영업점 생활을 응원합니다 :)"}
                        colors={colors}
                    />

                    {!isLoading && !error && dateFilteredStudiesCount > 0 && renderFilters()}

                    <StudyListContainer>
                        {isLoading ? (
                            <LoadingContainer>
                                <LoadingSpinner />
                                <EmptyStateText>데이터를 불러오는 중입니다...</EmptyStateText>
                            </LoadingContainer>
                        ) : error ? (
                            <ErrorText>{error}</ErrorText>
                        ) : studies.length === 0 ? (
                            <EmptyStateText>
                                현재 진행 중인 스터디가 없습니다. 첫 번째 스터디를 만들어보세요!
                            </EmptyStateText>
                        ) : dateFilteredStudiesCount === 0 ? (
                            <EmptyStateText>
                                선택한 날짜({formatDate(currentDate)})에 진행 중인 스터디가 없습니다.
                                다른 날짜를 선택해보세요.
                            </EmptyStateText>
                        ) : filteredStudies.length === 0 ? (
                            <EmptyStateText>
                                현재 필터 조건에 맞는 스터디가 없습니다. 다른 필터를 선택해보세요.
                            </EmptyStateText>
                        ) : (
                            filteredStudies.map(study => (
                                <StudyCard key={study.id}>
                                    <CardHeader>
                                        <TagsContainer>
                                            <StatusTag status={study.status}>
                                                {study.status === 'recruiting' ? '모집 중' :
                                                    study.status === 'completed' ? '모집 완료' : '모집 취소'}
                                            </StatusTag>
                                        </TagsContainer>
                                        <TagsContainer>
                                            <StudyTypeTag type={study.type}>
                                                {study.type === 'certificate' ? '자격증' : '취미'}
                                            </StudyTypeTag>
                                            <OnlineTag isOnline={study.isOnline}>
                                                {study.isOnline ? '온라인' : '오프라인'}
                                            </OnlineTag>
                                        </TagsContainer>
                                    </CardHeader>

                                    <CardBody onClick={() => openStudyModal(study)}>
                                        <ProfileSection>
                                            <ProfileImage
                                                alt={`${study.author.name} 프로필 사진`}
                                                src={study.author.profileImage}
                                            />
                                            <UserInfo>
                                                <UserName>{study.author.name}</UserName>
                                            </UserInfo>
                                        </ProfileSection>

                                        <StudyTitle>{study.title}</StudyTitle>
                                        <StudyInfoContainer>
                                            <MemberCount>
                                                <MdPerson size={16} color="#6B7280" />
                                                <DeadlineValue>
                                                    {study.currentMembers}/{study.totalMembers}
                                                </DeadlineValue>
                                            </MemberCount>

                                            <Deadline>
                                                <MdCalendarToday size={16} color="#6B7280" />
                                                <DeadlineValue>
                                                    {new Date(study.deadline).toLocaleDateString()} 마감
                                                </DeadlineValue>
                                            </Deadline>
                                        </StudyInfoContainer>
                                    </CardBody>

                                    <CardFooter>
                                        <StatusIndicator isApplied={study.isApplied} status={study.status}>
                                            <ApplyBadge isApplied={study.isApplied} status={study.status}>
                                                {study.isApplied ? (
                                                    <>
                                                        <MdCheck size={16} style={{ marginRight: '4px' }} />
                                                        신청됨
                                                    </>
                                                ) : study.status === 'recruiting' ? (
                                                    <>
                                                        <MdAccessTime size={16} style={{ marginRight: '4px' }} />
                                                        신청 가능
                                                    </>
                                                ) : study.status === 'completed' ? (
                                                    <>
                                                        <MdClose size={16} style={{ marginRight: '4px' }} />
                                                        모집 완료
                                                    </>
                                                ) : (
                                                    <>
                                                        <MdClose size={16} style={{ marginRight: '4px' }} />
                                                        모집 취소
                                                    </>
                                                )}
                                            </ApplyBadge>
                                        </StatusIndicator>
                                        <CardActions>
                                            <ViewDetailsButton onClick={() => openStudyModal(study)}>
                                                <MdInfo size={16} />
                                                상세보기
                                            </ViewDetailsButton>
                                        </CardActions>
                                    </CardFooter>
                                </StudyCard>
                            ))
                        )}
                    </StudyListContainer>
                </MainContent>

                <FloatingButton
                    onClick={handleCreateStudy}
                    icon={<MdEdit size={28} />}
                    ariaLabel="스터디 생성하기"
                    colors={colors}
                />
            </StudyContentWrapper>

            <StudyModal
                isOpen={showStudyModal}
                onClose={closeStudyModal}
                study={selectedStudy}
                onApply={handleApplyStudy}
                onCancelApply={handleCancelApply}
            />

            <StudyCreateModal
                isOpen={showCreateModal}
                onClose={handleCloseCreateModal}
                onSave={handleSaveStudy}
            />

            <ToastContainer toasts={toasts} onClose={hideToast} />
        </StudyContainer>
    );
};

export default StudyClient;