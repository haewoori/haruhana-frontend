'use client';

import { useState, useEffect, useRef } from 'react';
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
import { formatDate, formatGroupTitle } from '@/utils/dateUtils';

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
    cardColorOptions
} from "./page.style";

// 임시
const currentUser = {
    name: "홍길동",
    profileImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMsdQP9vZedjynJse1GaNBRueRKONNk1_DMD0xv0w5lXEtP_t9i5ecs1s9LBXVz3NJqpjebP7pk_TUV42wyhzAOuy7oAKdARyJaYysVNeFWxWaAWrUnWkHD9bG55OyrLLrCjchigWRccFh7H3WOsoYTMEesaVeiqeVnAGWa5psuRfwiYHNezuIBcLuuQ-IYU1h8bo4QIxliebx2DihSZRzYUTrxpjhNyLoIm4LFGqw3FiQDk4lcpGGrCsPACzrdrA-2CTOXgLqrw"
};

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
}

const FeedPage = () => {
    const [leftArrowHovered, setLeftArrowHovered] = useState(false);
    const [rightArrowHovered, setRightArrowHovered] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [showPostModal, setShowPostModal] = useState(false);
    const [posts, setPosts] = useState<Post[]>([
        {
            id: '1',
            author: {
                name: '홍길동',
                profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMsdQP9vZedjynJse1GaNBRueRKONNk1_DMD0xv0w5lXEtP_t9i5ecs1s9LBXVz3NJqpjebP7pk_TUV42wyhzAOuy7oAKdARyJaYysVNeFWxWaAWrUnWkHD9bG55OyrLLrCjchigWRccFh7H3WOsoYTMEesaVeiqeVnAGWa5psuRfwiYHNezuIBcLuuQ-IYU1h8bo4QIxliebx2DihSZRzYUTrxpjhNyLoIm4LFGqw3FiQDk4lcpGGrCsPACzrdrA-2CTOXgLqrw'
            },
            content: '수신 30분 공부하기',
            color: 'blue',
            reactions: [
                { emoji: '😄', count: 7 },
                { emoji: '👍', count: 10 },
                { emoji: '❤️', count: 100 }
            ]
        },
        {
            id: '2',
            author: {
                name: '홍길동',
                profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMsdQP9vZedjynJse1GaNBRueRKONNk1_DMD0xv0w5lXEtP_t9i5ecs1s9LBXVz3NJqpjebP7pk_TUV42wyhzAOuy7oAKdARyJaYysVNeFWxWaAWrUnWkHD9bG55OyrLLrCjchigWRccFh7H3WOsoYTMEesaVeiqeVnAGWa5psuRfwiYHNezuIBcLuuQ-IYU1h8bo4QIxliebx2DihSZRzYUTrxpjhNyLoIm4LFGqw3FiQDk4lcpGGrCsPACzrdrA-2CTOXgLqrw'
            },
            content: '오늘 퇴근하고 술 한잔 할 사람~~!',
            color: 'green'
        },
        {
            id: '3',
            author: {
                name: '김철수',
                profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMsdQP9vZedjynJse1GaNBRueRKONNk1_DMD0xv0w5lXEtP_t9i5ecs1s9LBXVz3NJqpjebP7pk_TUV42wyhzAOuy7oAKdARyJaYysVNeFWxWaAWrUnWkHD9bG55OyrLLrCjchigWRccFh7H3WOsoYTMEesaVeiqeVnAGWa5psuRfwiYHNezuIBcLuuQ-IYU1h8bo4QIxliebx2DihSZRzYUTrxpjhNyLoIm4LFGqw3FiQDk4lcpGGrCsPACzrdrA-2CTOXgLqrw'
            },
            content: '여신 업무 관련 질문 있으신 분?',
            color: 'purple'
        },
        {
            id: '4',
            author: {
                name: '이영희',
                profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMsdQP9vZedjynJse1GaNBRueRKONNk1_DMD0xv0w5lXEtP_t9i5ecs1s9LBXVz3NJqpjebP7pk_TUV42wyhzAOuy7oAKdARyJaYysVNeFWxWaAWrUnWkHD9bG55OyrLLrCjchigWRccFh7H3WOsoYTMEesaVeiqeVnAGWa5psuRfwiYHNezuIBcLuuQ-IYU1h8bo4QIxliebx2DihSZRzYUTrxpjhNyLoIm4LFGqw3FiQDk4lcpGGrCsPACzrdrA-2CTOXgLqrw'
            },
            content: '다음 주 영업 목표 달성 가능할까요?',
            color: 'orange'
        },
        {
            id: '5',
            author: {
                name: '박지민',
                profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMsdQP9vZedjynJse1GaNBRueRKONNk1_DMD0xv0w5lXEtP_t9i5ecs1s9LBXVz3NJqpjebP7pk_TUV42wyhzAOuy7oAKdARyJaYysVNeFWxWaAWrUnWkHD9bG55OyrLLrCjchigWRccFh7H3WOsoYTMEesaVeiqeVnAGWa5psuRfwiYHNezuIBcLuuQ-IYU1h8bo4QIxliebx2DihSZRzYUTrxpjhNyLoIm4LFGqw3FiQDk4lcpGGrCsPACzrdrA-2CTOXgLqrw'
            },
            content: '주말에 같이 스터디하실 분 구합니다!',
            color: 'pink'
        }
    ]);

    const calendarRef = useRef<HTMLDivElement>(null);

    const changeDate = (days: number) => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + days);
        setCurrentDate(newDate);
    };

    const selectDate = (date: Date) => {
        setCurrentDate(date);
        setShowCalendar(false);
    };

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

    const handleSavePost = (content: string, color: string) => {
        const newPost: Post = {
            id: Date.now().toString(),
            author: {
                name: currentUser.name,
                profileImage: currentUser.profileImage
            },
            content,
            color
        };

        setPosts([newPost, ...posts]);
        setShowPostModal(false);
    };

    const handleDeletePost = (postId: string) => {
        setPosts(posts.filter(post => post.id !== postId));
    };

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
                        {posts.map(post => (
                            <PostCard key={post.id} bgColor={post.color}>
                                {post.author.name === currentUser.name && (
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
                        ))}
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

export default FeedPage;