import { colors } from '@/app/feed/page.style';

/**
 * 색상 ID를 16진수 색상 코드로 변환
 * @param colorId - 색상 ID (blue, green 등)
 * @returns 16진수 색상 코드 (#RRGGBB 형식)
 */
export const convertColorIdToHex = (colorId: string): string => {
    switch(colorId) {
        case 'blue':
            return colors.cardColors.blue.color;
        case 'green':
            return colors.cardColors.green.color;
        case 'purple':
            return colors.cardColors.purple.color;
        case 'orange':
            return colors.cardColors.orange.color;
        case 'pink':
            return colors.cardColors.pink.color;
        default:
            return colors.cardColors.blue.color;
    }
};