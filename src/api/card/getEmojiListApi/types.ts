export interface EmojiData {
  emojiId: string;
  emoji: string;
}

export interface GetEmojiListResponse {
  emojiVoList: EmojiData[];
}