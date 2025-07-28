'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import {
    IoIosArrowBack,
    IoIosArrowForward,
} from 'react-icons/io';
import {
    MdCampaign,
    MdClose,
    MdAdd,
    MdEdit
} from 'react-icons/md';

import Calendar from '@/components/Calendar/Calendar';
import PostModal from '@/components/PostModal/PostModal';
import { formatDate, formatGroupTitle, formatDateToString } from '@/utils/dateUtils';
import { getCards } from '@/api/card/searchCardApi/searchCardClientApi';
import { convertCardsToUIFormat } from '@/utils/cardUtils';

import {
    FeedContainer,
    FeedContentWrapper,
    Header,
    HeaderContent,
    DateNavigation,
    DateButton,
    DateText,
    MainContent,
    HeaderContainer,
    GroupTitle,
    GradientText,
    AnnouncementBox,
    AnnouncementText,
    PostsContainer,
    PostCard,
    CloseButton,
    ProfileSection,
    ProfileImage,
    ProfileImageWithBorder,
    UserInfo,
    UserName,
    UserGroup,
    PostContent,
    ReactionContainer,
    ReactionBadge,
    EmojiIcon,
    ReactionCount,
    ReactionButton,
    FloatingButton,
    AnnouncementIcon,
    cardColorOptions, LoadingContainer, LoadingSpinner, EmptyStateText, ErrorText
} from "./page.style";

interface Post {
    id: string;
    author: {
        name: string;
        profileImage: string;
    };
    content: string;
    color: string;
    reactions?: {
        emoji: string;
        count: number;
    }[];
    isMyCard?: boolean;
    createdAt?: string;
}

const FeedClient = () => {
    const router = useRouter();
    const { accessToken, isAuthenticated } = useSelector((state: any) => state.auth);

    const [leftArrowHovered, setLeftArrowHovered] = useState(false);
    const [rightArrowHovered, setRightArrowHovered] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [showPostModal, setShowPostModal] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const calendarRef = useRef<HTMLDivElement>(null);

    // 인증 체크
    useEffect(() => {
        console.log('현재 액세스 토큰:', accessToken);

        if (!accessToken) {
            router.push('/');
        }
    }, [isAuthenticated, accessToken, router]);

    // 날짜 변경 시 카드 데이터 로드
    useEffect(() => {
        const fetchCards = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await getCards(currentDate);
                const formattedPosts = convertCardsToUIFormat(response);
                setPosts(formattedPosts);
            } catch (err) {
                console.error('카드 데이터를 불러오는 중 오류가 발생했습니다:', err);
                setError('카드 데이터를 불러오는 중 오류가 발생했습니다. 새로고침 해주세요.');
                setPosts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCards();
    }, [currentDate]);

    // 날짜 변경 함수
    const changeDate = (days: number) => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + days);
        setCurrentDate(newDate);
    };

    // 캘린더에서 날짜 선택 함수
    const selectDate = (date: Date) => {
        setCurrentDate(date);
        setShowCalendar(false);
    };

    // 캘린더 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setShowCalendar(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // 새 포스트 저장 함수 - accessToken 기반
    const handleSavePost = (content: string, color: string) => {
        // 실제 API 호출 로직은 추후 추가 예정
        // 현재는 임시로 로컬 상태에만 추가
        // const newPost: Post = {
        //     id: Date.now().toString(),
        //     author: {
        //         name: currentUser.name,
        //         profileImage: currentUser.profileImage
        //     },
        //     content,
        //     color,
        //     isMyCard: true,
        //     createdAt: new Date().toISOString()
        // };
        //
        // setPosts([newPost, ...posts]);
        // setShowPostModal(false);
    };

    // 포스트 삭제 함수 - accessToken 기반
    const handleDeletePost = (postId: string) => {
        // 실제 API 호출 로직은 추후 추가 예정
        // 현재는 임시로 로컬 상태에서만 삭제
        setPosts(posts.filter(post => post.id !== postId));
    };

    // TODO: isLoading 디자인 개선
    return (
        <FeedContainer>
            <Header>
                <HeaderContent>
                    <DateNavigation>
                        <DateButton
                            isHovered={leftArrowHovered}
                            onMouseEnter={() => setLeftArrowHovered(true)}
                            onMouseLeave={() => setLeftArrowHovered(false)}
                            onClick={() => changeDate(-1)}
                            aria-label="이전 날짜"
                        >
                            <IoIosArrowBack size={18} />
                        </DateButton>
                        <DateText onClick={() => setShowCalendar(!showCalendar)}>
                            {formatDate(currentDate)}
                        </DateText>
                        <DateButton
                            isHovered={rightArrowHovered}
                            onMouseEnter={() => setRightArrowHovered(true)}
                            onMouseLeave={() => setRightArrowHovered(false)}
                            onClick={() => changeDate(1)}
                            aria-label="다음 날짜"
                        >
                            <IoIosArrowForward size={18} />
                        </DateButton>
                    </DateNavigation>

                    {showCalendar && (
                        <Calendar
                            selectedDate={currentDate}
                            onDateSelect={selectDate}
                            containerRef={calendarRef}
                        />
                    )}
                </HeaderContent>
            </Header>

            <FeedContentWrapper>
                <MainContent>
                    <HeaderContainer>
                        <GroupTitle>{formatGroupTitle(currentDate)}</GroupTitle>
                        <GradientText>함께 성장해요⚡️</GradientText>
                    </HeaderContainer>

                    <AnnouncementBox>
                        <AnnouncementIcon>
                            <MdCampaign size={20} />
                        </AnnouncementIcon>
                        <AnnouncementText>여러분의 영업점 생활을 응원합니다:)</AnnouncementText>
                    </AnnouncementBox>

                    <PostsContainer>
                        {isLoading ? (
                            <LoadingContainer>
                                <LoadingSpinner />
                                <EmptyStateText>데이터를 불러오는 중입니다...</EmptyStateText>
                            </LoadingContainer>
                        ) : error ? (
                            <ErrorText>{error}</ErrorText>
                        ) : posts.length === 0 ? (
                            <EmptyStateText>
                                이 날짜에 작성된 카드가 없습니다. 첫 번째 카드를 작성해보세요!
                            </EmptyStateText>
                        ) : (
                            posts.map(post => (
                                <PostCard key={post.id} bgColor={post.color}>
                                    {post.isMyCard && (
                                        <CloseButton
                                            aria-label="게시물 삭제"
                                            onClick={() => handleDeletePost(post.id)}
                                        >
                                            <MdClose size={20} />
                                        </CloseButton>
                                    )}
                                    <ProfileSection>
                                        <ProfileImage
                                            alt={`${post.author.name} 프로필 사진`}
                                            src={post.author.profileImage}
                                        />
                                        <UserInfo>
                                            <UserName>{post.author.name}</UserName>
                                            <UserGroup>{formatGroupTitle(currentDate)}</UserGroup>
                                        </UserInfo>
                                    </ProfileSection>
                                    <PostContent>{post.content}</PostContent>
                                    <ReactionContainer>
                                        {post.reactions?.map((reaction, index) => (
                                            <ReactionBadge key={index}>
                                                <EmojiIcon>{reaction.emoji}</EmojiIcon>
                                                <ReactionCount>{reaction.count}</ReactionCount>
                                            </ReactionBadge>
                                        ))}
                                        <ReactionButton aria-label="반응 추가">
                                            <MdAdd size={15} />
                                        </ReactionButton>
                                    </ReactionContainer>
                                </PostCard>
                            ))
                        )}
                    </PostsContainer>
                </MainContent>

                <FloatingButton
                    aria-label="글 작성하기"
                    onClick={() => setShowPostModal(true)}
                >
                    <MdEdit size={28} />
                </FloatingButton>
            </FeedContentWrapper>

            <PostModal
                isOpen={showPostModal}
                onClose={() => setShowPostModal(false)}
                onSave={handleSavePost}
            />
        </FeedContainer>
    )
}

export default FeedClient;