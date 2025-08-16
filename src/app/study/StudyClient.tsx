'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import {
    MdFilterList,
    MdAccessTime,
    MdCheck,
    MdClear,
    MdPerson,
    MdCalendarToday,
    MdClose,
    MdInfo,
    MdEdit,
    MdCampaign,
    MdFilterAlt,
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdFirstPage,
    MdLastPage
} from 'react-icons/md';

import { useToast } from '@/hooks/useToast';
import { ToastContainer } from '@/components/Toast';
import StudyModal from './StudyModal';
import StudyCreateModal, { StudyFormData } from '@/components/StudyCreateModal/StudyCreateModal';
import { formatDate } from '@/utils/dateUtils';
import { getStudies } from '@/api/study/getStudyApi';
import { adaptStudyCardToStudy } from '@/utils/studyAdapter';

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
    ViewDetailsButton, FilterButton, FilterContainer, FilterBadge, FilterDivider, ClearFiltersButton,
    PaginationContainer,
    PaginationButton,
    PaginationInfo,
    PageNumbersContainer,
    PaginationEllipsis,
} from './page.style';

import {
    Study,
    StudyStatusType,
    StudyFilterStatusType,
    StudyFilters,
    StudyType, parseStudyType, studyTypeToApiCategory
} from '@/types/study/study';
import {createStudy} from "@/api/study/createStudyApi";

interface Member {
    id: string;
    name: string;
}

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

    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
        totalPages: 0,
        totalElements: 0
    });

    // 인증 체크
    useEffect(() => {
        if (!accessToken) {
            router.push('/');
        }
    }, [isAuthenticated, accessToken, router]);

    const fetchStudies = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const params = {
                page: pagination.page,
                size: pagination.size,
                sort: "createdTime,desc"
            };

            if (filters.status !== 'all') {
                params.available = filters.status === StudyStatusType.RECRUITING;
            }

            const response = await getStudies(params);
            const adaptedStudies = response.result.content.map(adaptStudyCardToStudy);

            setPagination({
                page: response.result.pageable.pageNumber,
                size: response.result.pageable.pageSize,
                totalPages: response.result.totalPages,
                totalElements: response.result.totalElements
            });

            setStudies(adaptedStudies);
            setIsLoading(false);
        } catch (err) {
            console.error('스터디 데이터를 불러오는 중 오류가 발생했습니다:', err);
            setError('스터디 데이터를 불러오는 중 오류가 발생했습니다. 새로고침 해주세요.');
            setStudies([]);
            setIsLoading(false);
        }
    };

    // 스터디 데이터 로드
    useEffect(() => {
        fetchStudies();
    }, [filters.status, pagination.page, pagination.size]);

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
    const handleFilterChange = useCallback((status: StudyFilterStatusType) => {
        setFilters(prev => ({
            ...prev,
            status: status
        }));

        // 필터 변경 시 페이지 초기화
        setPagination(prev => ({
            ...prev,
            page: 0
        }));
    }, []);

    // 페이지 변경 핸들러
    const handlePageChange = (newPage: number) => {
        setPagination(prev => ({
            ...prev,
            page: newPage
        }));
    };

    // 필터 초기화 핸들러
    const clearFilters = useCallback(() => {
        setFilters({
            status: 'all'
        });
    }, []);

    // 각 상태별 스터디 개수 계산
    const getStudyCountByStatus = useCallback((status: StudyFilterStatusType): number => {
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
            </FilterButton>

            <FilterButton
                active={filters.status === StudyStatusType.RECRUITING}
                onClick={() => handleFilterChange(StudyStatusType.RECRUITING)}
            >
                <MdAccessTime size={16} />
                모집 중
            </FilterButton>

            <FilterButton
                active={filters.status === StudyStatusType.COMPLETED}
                onClick={() => handleFilterChange(StudyStatusType.COMPLETED)}
            >
                <MdCheck size={16} />
                모집 완료
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

    // 페이지네이션 렌더링 함수
    const renderPagination = () => {
        if (isLoading || error) return null;
        if (pagination.totalPages <= 1 || filteredStudies.length === 0) return null;

        const renderPageButtons = () => {
            const pageButtons = [];
            const currentPage = pagination.page;
            const totalPages = pagination.totalPages;

            const maxPageButtons = 5;

            let startPage = Math.max(0, currentPage - Math.floor(maxPageButtons / 2));
            let endPage = Math.min(totalPages - 1, startPage + maxPageButtons - 1);

            if (endPage - startPage + 1 < maxPageButtons) {
                startPage = Math.max(0, endPage - maxPageButtons + 1);
            }

            if (startPage > 0) {
                pageButtons.push(
                    <PaginationButton
                        key="first"
                        onClick={() => handlePageChange(0)}
                        isControl
                        aria-label="첫 페이지"
                    >
                        <MdFirstPage size={18} />
                    </PaginationButton>
                );

                if (startPage > 1) {
                    pageButtons.push(<PaginationEllipsis key="ellipsis-start">...</PaginationEllipsis>);
                }
            }

            for (let i = startPage; i <= endPage; i++) {
                pageButtons.push(
                    <PaginationButton
                        key={i}
                        active={i === currentPage}
                        onClick={() => handlePageChange(i)}
                        aria-label={`${i + 1} 페이지`}
                        aria-current={i === currentPage ? 'page' : undefined}
                    >
                        {i + 1}
                    </PaginationButton>
                );
            }

            if (endPage < totalPages - 1) {
                if (endPage < totalPages - 2) {
                    pageButtons.push(<PaginationEllipsis key="ellipsis-end">...</PaginationEllipsis>);
                }

                pageButtons.push(
                    <PaginationButton
                        key="last"
                        onClick={() => handlePageChange(totalPages - 1)}
                        isControl
                        aria-label="마지막 페이지"
                    >
                        <MdLastPage size={18} />
                    </PaginationButton>
                );
            }

            return pageButtons;
        };

        return (
            <PaginationContainer>
                <PaginationButton
                    onClick={() => handlePageChange(Math.max(0, pagination.page - 1))}
                    disabled={pagination.page === 0}
                    isControl
                    aria-label="이전 페이지"
                >
                    <MdKeyboardArrowLeft size={18} />
                </PaginationButton>

                <PageNumbersContainer>
                    {renderPageButtons()}
                </PageNumbersContainer>

                <PaginationButton
                    onClick={() => handlePageChange(Math.min(pagination.totalPages - 1, pagination.page + 1))}
                    disabled={pagination.page === pagination.totalPages - 1}
                    isControl
                    aria-label="다음 페이지"
                >
                    <MdKeyboardArrowRight size={18} />
                </PaginationButton>
            </PaginationContainer>
        );
    };

    // 스터디 신청 함수
    const handleApplyStudy = useCallback((studyId: string) => {
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
    const handleSaveStudy = useCallback(async (studyData: StudyFormData) => {
        const apiCategory = studyTypeToApiCategory(studyData.type);
        await createStudy(
            studyData.title,
            studyData.description,
            studyData.totalMembers,
            studyData.deadline,
            apiCategory,
            studyData.isOnline
        );

        setShowCreateModal(false);
        showToast('스터디가 성공적으로 생성되었습니다.', 'success');

        fetchStudies();
        router.refresh();
    }, [showToast]);

    // 날짜에 따른 필터링된 스터디 수 확인
    const dateFilteredStudiesCount = studies.filter(study => isDateInRange(study, currentDate)).length;

    // 최종 필터링된 스터디 목록 가져오기
    const filteredStudies = getFilteredStudies();

    return (
        <StudyContainer>
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

                    {!isLoading && !error && renderFilters()}

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
                                {formatDate(currentDate)}에 진행 중인 스터디가 없습니다.
                                다른 날짜를 선택해보세요.
                            </EmptyStateText>
                        ) : filteredStudies.length === 0 ? (
                            <EmptyStateText>
                                현재 필터 조건에 맞는 스터디가 없습니다. 다른 필터를 선택해보세요.
                            </EmptyStateText>
                        ) : (
                            filteredStudies.map(study => (
                                <StudyCard
                                    key={study.id}
                                    status={study.status}
                                    data-study-card-id={study.studyCardId}
                                >
                                    <CardHeader>
                                        <TagsContainer>
                                            <StatusTag status={study.status}>
                                                {study.status === StudyStatusType.RECRUITING ? '모집 중' : '모집 완료'}
                                            </StatusTag>
                                        </TagsContainer>
                                        <TagsContainer>
                                            <StudyTypeTag type={study.type}>
                                                {study.type === StudyType.CERTIFICATE ? '자격증' : '취미'}
                                            </StudyTypeTag>
                                            <OnlineTag isOnline={study.isOnline}>
                                                {study.isOnline ? '온라인' : '오프라인'}
                                            </OnlineTag>
                                        </TagsContainer>
                                    </CardHeader>

                                    <CardBody status={study.status} onClick={() => openStudyModal(study)}>
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
                                                    모집 마감일 {new Date(study.deadline).toLocaleDateString()}
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
                                                ) : study.status === StudyStatusType.RECRUITING ? (
                                                    <>
                                                        <MdAccessTime size={16} style={{ marginRight: '4px' }} />
                                                        신청 가능
                                                    </>
                                                ) : (
                                                    <>
                                                        <MdClose size={16} style={{ marginRight: '4px' }} />
                                                        모집 완료
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

                    {!isLoading && !error && pagination.totalPages > 1 && filteredStudies.length > 0 && renderPagination()}

                    <FloatingButton
                        onClick={handleCreateStudy}
                        icon={<MdEdit size={28} />}
                        ariaLabel="스터디 생성하기"
                        colors={colors}
                    />
                </MainContent>
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