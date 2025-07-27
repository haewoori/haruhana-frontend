export interface UserProfile {
    username: string;
    profileImageUrl: string;
}

export interface EmojiRecord {
    emojiId: string;
    image: string;
    userId: string;
}

export interface Card {
    cardId: string;
    content: string;
    userProfile: UserProfile;
    emojiRecords: EmojiRecord[];
    bgColor: string;
    createdAt: string;
}

export interface GetCardsResponse {
    myCards: Card[];
    otherCards: Card[];
}

export interface GetCardsParams {
    date: string; // YYYY-MM-DD 형식
}