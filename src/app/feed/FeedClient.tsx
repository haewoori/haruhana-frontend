'use client';

import { createCard } from '@/api/card/createCardApi';
import { useState, useEffect, useRef, useCallback } from 'react';
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
import { getEmojiList } from '@/api/card/getEmojiListApi';
import { EmojiData } from '@/api/card/getEmojiListApi/types';
import { addEmoji } from '@/api/card/addEmojiApi';
import { deleteEmoji } from '@/api/card/deleteEmojiApi';
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from '@/components/Toast';
import { getNotifications } from '@/api/notification/getNotificationsApi';

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
    cardColorOptions,
    LoadingContainer,
    LoadingSpinner,
    EmptyStateText,
    ErrorText,
    EmojiPickerContainer,
    EmojiButton,
    EmojiPickerTitle
} from "./page.style";
import {deleteCard} from "@/api/card/deleteCardApi";

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
        isMine: boolean;
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
    const [activeEmojiPicker, setActiveEmojiPicker] = useState<string | null>(null);
    const [emojiPickerPosition, setEmojiPickerPosition] = useState<'top' | 'bottom'>('top');
    const [emojiList, setEmojiList] = useState<EmojiData[]>([]);
    const [notification, setNotification] = useState<string | null>(null);

    const { toasts, showToast, hideToast } = useToast();
    const calendarRef = useRef<HTMLDivElement>(null);

    // 이모지 처리 헬퍼 함수
    const handleExistingEmoji = useCallback((
        reactions: Post['reactions'] = [],
        myExistingReaction: { emoji: string; count: number; isMine: boolean; } | undefined,
        newEmojiValue: string
    ) => {
        if (myExistingReaction && myExistingReaction.emoji !== newEmojiValue) {
            return reactions.map(reaction => {
                if (reaction.emoji === myExistingReaction.emoji && reaction.isMine) {
                    if (reaction.count > 1) {
                        return {
                            ...reaction,
                            count: reaction.count - 1,
                            isMine: false
                        };
                    }
                    return null;
                }
                return reaction;
            }).filter(Boolean) as typeof reactions;
        }

        return reactions;
    }, []);

    // 새 이모지 추가 또는 업데이트 헬퍼 함수
    const addOrUpdateEmoji = useCallback((
        reactions: Post['reactions'] = [],
        emojiValue: string
    ) => {
        const existingIndex = reactions.findIndex(reaction => reaction.emoji === emojiValue);

        if (existingIndex !== -1) {
            return reactions.map((reaction, index) => {
                if (index === existingIndex) {
                    return {
                        ...reaction,
                        count: reaction.count + 1,
                        isMine: true
                    };
                }
                return reaction;
            });
        } else {
            return [
                ...reactions,
                {
                    emoji: emojiValue,
                    count: 1,
                    isMine: true
                }
            ];
        }
    }, []);

    // 인증 체크
    useEffect(() => {
        console.log('현재 액세스 토큰:', accessToken);

        if (!accessToken) {
            router.push('/');
        }
    }, [isAuthenticated, accessToken, router]);

    // 컴포넌트 마운트 시 공지사항 로드
    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const response = await getNotifications();
                setNotification(response.message);
            } catch (err) {
                console.error('공지사항을 불러오는 중 오류가 발생했습니다:', err);
                setNotification(null);
            }
        };

        fetchNotification();
    }, []);

    // 컴포넌트 마운트 시 이모지 리스트 로드
    useEffect(() => {
        const fetchEmojiList = async () => {
            try {
                const response = await getEmojiList();
                setEmojiList(response.emojiVoList);
            } catch (err) {
                console.error('이모지 리스트를 불러오는 중 오류가 발생했습니다:', err);
            }
        };

        fetchEmojiList();
    }, []);

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
    const changeDate = useCallback((days: number) => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + days);
        setCurrentDate(newDate);
    }, [currentDate]);

    // 캘린더에서 날짜 선택 함수
    const selectDate = useCallback((date: Date) => {
        setCurrentDate(date);
        setShowCalendar(false);
    }, []);

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

    // 새 포스트 저장 함수
    const handleSavePost = async (content: string, color: string) => {
        setIsLoading(true);
        setError(null);

        try {
            await createCard(content, color);
            setShowPostModal(false);

            const response = await getCards(currentDate);
            const formattedPosts = convertCardsToUIFormat(response);
            setPosts(formattedPosts);
            showToast('카드가 성공적으로 생성되었습니다.', 'success');
        } catch (err) {
            console.error('카드 생성 중 오류가 발생했습니다:', err);
            setError('카드 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
            showToast('카드 생성 중 오류가 발생했습니다.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    // 포스트 삭제 함수
    const handleDeletePost = useCallback(async (postId: string) => {
        if (!confirm('정말로 이 카드를 삭제하시겠습니까?')) {
            return;
        }

        const currentPosts = [...posts];
        setPosts(posts.filter(post => post.id !== postId));

        try {
            await deleteCard(postId);
            showToast('카드가 삭제되었습니다.', 'success');
        } catch (err) {
            console.error('카드 삭제 중 오류가 발생했습니다:', err);
            showToast('카드 삭제 중 오류가 발생했습니다.', 'error');

            setPosts(currentPosts);
        }
    }, [posts, showToast]);

    // 이모지 추가 함수
    const handleAddEmoji = useCallback(async (postId: string, emojiId: string) => {
        const emojiData = emojiList.find(item => item.emojiId === emojiId);
        if (!emojiData) {
            console.error('추가할 이모지 데이터를 찾을 수 없습니다.');
            return;
        }

        const currentPosts = [...posts];
        const updatedPosts = posts.map(post => {
            if (post.id !== postId) return post;

            const reactions = [...(post.reactions || [])];
            const myExistingReaction = reactions.find(reaction => reaction.isMine);
            let updatedReactions = handleExistingEmoji(
                reactions,
                myExistingReaction,
                emojiData.emoji
            );

            updatedReactions = addOrUpdateEmoji(
                updatedReactions,
                emojiData.emoji
            );

            return {
                ...post,
                reactions: updatedReactions
            };
        });

        // UI 즉시 업데이트
        setPosts(updatedPosts);
        setActiveEmojiPicker(null);

        // 백그라운드에서 API 호출
        try {
            await addEmoji(postId, emojiId);
            showToast('이모지가 추가되었습니다.', 'success');
        } catch (err) {
            console.error('이모지 추가 중 오류가 발생했습니다:', err);
            showToast('이모지 추가 중 오류가 발생했습니다.', 'error');

            setPosts(currentPosts);
        }
    }, [posts, emojiList, handleExistingEmoji, addOrUpdateEmoji, showToast]);

    // 이모지 삭제 함수
    const handleDeleteEmoji = useCallback(async (postId: string, emoji: string) => {
        const emojiData = emojiList.find(item => item.emoji === emoji);

        if (!emojiData) {
            console.error('삭제할 이모지 데이터를 찾을 수 없습니다.');
            return;
        }

        const currentPosts = [...posts];
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                const updatedReactions = post.reactions?.map(reaction => {
                    if (reaction.emoji === emoji && reaction.isMine) {
                        if (reaction.count > 1) {
                            return {
                                ...reaction,
                                count: reaction.count - 1,
                                isMine: false
                            };
                        }
                        return null;
                    }
                    return reaction;
                }).filter(Boolean) as typeof post.reactions;

                return {
                    ...post,
                    reactions: updatedReactions
                };
            }
            return post;
        });

        setPosts(updatedPosts);

        try {
            await deleteEmoji(postId, emojiData.emojiId);
            showToast('이모지가 삭제되었습니다.', 'success');
        } catch (err) {
            console.error('이모지 삭제 중 오류가 발생했습니다:', err);
            showToast('이모지 삭제 중 오류가 발생했습니다.', 'error');

            setPosts(currentPosts);
        }
    }, [posts, emojiList, showToast]);

    // 이모지 선택기 토글 함수
    const toggleEmojiPicker = useCallback((postId: string, event?: React.MouseEvent) => {
        if (activeEmojiPicker === postId) {
            setActiveEmojiPicker(null);
        } else {
            if (event && event.currentTarget) {
                setEmojiPickerPosition('top');
            }

            setActiveEmojiPicker(postId);
        }
    }, [activeEmojiPicker]);

    // 이모지 선택기 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (activeEmojiPicker &&
                !(event.target as Element).closest('.emoji-picker') &&
                !(event.target as Element).closest('.emoji-button')) {
                setActiveEmojiPicker(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeEmojiPicker]);

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
                        <GroupTitle>우리은행 25년도 7월 행번</GroupTitle>
                        <GradientText>함께 성장해요⚡️</GradientText>
                    </HeaderContainer>

                    {notification ? (
                        <AnnouncementBox>
                            <AnnouncementIcon>
                                <MdCampaign size={20} />
                            </AnnouncementIcon>
                            <AnnouncementText>{notification}</AnnouncementText>
                        </AnnouncementBox>
                    ) : (
                        <AnnouncementBox>
                            <AnnouncementIcon>
                                <MdCampaign size={20} />
                            </AnnouncementIcon>
                            <AnnouncementText>여러분의 영업점 생활을 응원합니다 :)</AnnouncementText>
                        </AnnouncementBox>
                    )}

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
                                            <UserGroup>우리은행 25년도 7월 행번</UserGroup>
                                        </UserInfo>
                                    </ProfileSection>
                                    <PostContent>{post.content}</PostContent>
                                    <ReactionContainer>
                                        {post.reactions?.map((reaction, index) => (
                                            <ReactionBadge
                                                key={index}
                                                isMine={reaction.isMine}
                                                title={reaction.isMine ? "클릭하여 이모지 삭제" : ""}
                                                onClick={() => {
                                                    if (reaction.isMine) {
                                                        handleDeleteEmoji(post.id, reaction.emoji);
                                                    }
                                                }}
                                            >
                                                <EmojiIcon>{reaction.emoji}</EmojiIcon>
                                                <ReactionCount>{reaction.count}</ReactionCount>
                                            </ReactionBadge>
                                        ))}
                                        <div style={{ position: 'relative' }}>
                                            <ReactionButton
                                                aria-label="반응 추가"
                                                className="emoji-button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleEmojiPicker(post.id, e);
                                                }}
                                            >
                                                <MdAdd size={15} />
                                            </ReactionButton>
                                            {activeEmojiPicker === post.id && (
                                                <EmojiPickerContainer
                                                    className="emoji-picker"
                                                    position={emojiPickerPosition}
                                                >
                                                    {emojiList.map((emojiData) => (
                                                        <EmojiButton
                                                            key={emojiData.emojiId}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleAddEmoji(post.id, emojiData.emojiId);
                                                            }}
                                                            aria-label={`이모지 ${emojiData.emoji} 추가`}
                                                            title={emojiData.emoji}
                                                        >
                                                            {emojiData.emoji}
                                                        </EmojiButton>
                                                    ))}
                                                </EmojiPickerContainer>
                                            )}
                                        </div>
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

            <ToastContainer toasts={toasts} onClose={hideToast} />
        </FeedContainer>
    );
};

export default FeedClient;