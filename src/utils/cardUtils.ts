import { Card, GetCardsResponse } from '@/api/card/searchCardApi/types';
import { cardColorOptions } from '@/app/feed/page.style';

interface UIPost {
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

/**
 * API에서 받아온 카드 데이터를 UI에서 사용하는 형식으로 변환
 * @param card - API에서 받아온 카드 데이터
 * @param isMyCard - 내 카드인지 여부 (삭제 버튼 표시 결정)
 * @returns UI에서 사용할 수 있는 형식의 카드 데이터
 */
export const convertCardToUIFormat = (card: Card, isMyCard: boolean) => {
    // 이모지 데이터를 reactions 형식으로 변환
    // 여러 사용자가 같은 이모지를 사용할 경우 카운트 증가
    const emojiCounts = card.emojiRecords.reduce((acc: Record<string, number>, emoji) => {
        const emojiKey = emoji.image;
        acc[emojiKey] = (acc[emojiKey] || 0) + 1;
        return acc;
    }, {});

    const reactions = Object.entries(emojiCounts).map(([emoji, count]) => ({
        emoji,
        count
    }));

    return {
        id: card.cardId,
        author: {
            name: card.userProfile.username,
            profileImage: card.userProfile.profileImageUrl
        },
        content: card.content,
        color: card.bgColor || getRandomCardColor(), // bgColor가 없을 경우 랜덤 색상 할당
        reactions: reactions.length > 0 ? reactions : undefined,
        isMyCard, // 내 카드 여부
        createdAt: card.createdAt
    };
};

/**
 * 랜덤 카드 색상 반환
 * @returns 카드 색상 ID
 */
export const getRandomCardColor = (): string => {
    const randomIndex = Math.floor(Math.random() * cardColorOptions.length);
    return cardColorOptions[randomIndex].id;
};

/**
 * 카드 목록을 UI에서 사용하는 형식으로 변환
 * @param response - API 응답 데이터
 * @returns UI에서 사용할 수 있는 형식의 카드 목록
 */
export const convertCardsToUIFormat = (response: GetCardsResponse): UIPost[] => {
    const myCards = response.myCards.map(card => ({
        id: card.cardId,
        author: {
            name: card.userProfile.username,
            profileImage: card.userProfile.profileImageUrl
        },
        content: card.content,
        color: card.bgColor || getRandomCardColor(),
        reactions: processEmojiRecords(card.emojiRecords),
        isMyCard: true,
        createdAt: card.createdAt
    }));

    const otherCards = response.otherCards.map(card => ({
        id: card.cardId,
        author: {
            name: card.userProfile.username,
            profileImage: card.userProfile.profileImageUrl
        },
        content: card.content,
        color: card.bgColor || getRandomCardColor(),
        reactions: processEmojiRecords(card.emojiRecords),
        isMyCard: false,
        createdAt: card.createdAt
    }));

    // 최신순 정렬
    return [...myCards, ...otherCards].sort((a, b) => {
        if (a.createdAt && b.createdAt) {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return 0;
    });
};

// 이모지 레코드를 UI 형식으로 처리하는 함수
const processEmojiRecords = (emojiRecords: Card['emojiRecords']) => {
    const emojiCounts: Record<string, { count: number, isMine: boolean }> = {};

    // 내가 추가한 이모지 여부 확인
    emojiRecords.forEach(record => {
        if (!emojiCounts[record.image]) {
            emojiCounts[record.image] = { count: 0, isMine: false };
        }
        emojiCounts[record.image].count += 1;

        if (record.isMine) {
            emojiCounts[record.image].isMine = true;
        }
    });

    return Object.entries(emojiCounts).map(([emoji, data]) => ({
        emoji,
        count: data.count,
        isMine: data.isMine
    }));
};
