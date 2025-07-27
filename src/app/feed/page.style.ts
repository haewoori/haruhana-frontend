import styled from "@emotion/styled";
import {
    Container,
    ContentWrapper,
    Footer,
    ButtonContent,
} from "../page.style";

export const colors = {
    primary: {
        light: '#EBF4FF',
        main: '#3B82F6',
        dark: '#1E40AF',
        gradient: 'linear-gradient(135deg, #60A5FA, #2563EB)'
    },
    secondary: {
        light: '#F0F9FF',
        main: '#0EA5E9',
        dark: '#0369A1'
    },
    cardColors: {
        blue: {
            name: '파란색',
            color: '#3B82F6',
            gradient: 'linear-gradient(135deg, #60A5FA, #2563EB)'
        },
        green: {
            name: '초록색',
            color: '#10B981',
            gradient: 'linear-gradient(135deg, #34D399, #059669)'
        },
        purple: {
            name: '보라색',
            color: '#8B5CF6',
            gradient: 'linear-gradient(135deg, #A78BFA, #7C3AED)'
        },
        orange: {
            name: '주황색',
            color: '#F59E0B',
            gradient: 'linear-gradient(135deg, #FBBF24, #D97706)'
        },
        pink: {
            name: '분홍색',
            color: '#EC4899',
            gradient: 'linear-gradient(135deg, #F472B6, #DB2777)'
        }
    },
    neutral: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827'
    },
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6'
};

export const getCardAccentColor = (colorKey: string): string => {
    if (colorKey === 'blue') return colors.cardColors.blue.gradient;
    if (colorKey === 'green') return colors.cardColors.green.gradient;
    if (colorKey === 'purple') return colors.cardColors.purple.gradient;
    if (colorKey === 'orange') return colors.cardColors.orange.gradient;
    if (colorKey === 'pink') return colors.cardColors.pink.gradient;

    switch(colorKey) {
        case 'primary':
            return colors.primary.gradient;
        case 'secondary':
            return colors.secondary.main;
        case 'success':
            return colors.success;
        case 'warning':
            return colors.warning;
        case 'error':
            return colors.error;
        default:
            return colorKey;
    }
};

export const cardColorOptions = [
    { id: 'blue', name: '파란색', value: colors.cardColors.blue.color },
    { id: 'green', name: '초록색', value: colors.cardColors.green.color },
    { id: 'purple', name: '보라색', value: colors.cardColors.purple.color },
    { id: 'orange', name: '주황색', value: colors.cardColors.orange.color },
    { id: 'pink', name: '분홍색', value: colors.cardColors.pink.color }
];

export const DateText = styled.button`
    font-weight: 600;
    color: ${colors.neutral[700]};
    display: flex;
    align-items: center;
    background: none;
    cursor: pointer;
    transition: color 0.2s;
    
    &:hover {
        color: ${colors.primary.main};
    }
`;

export const DateButton = styled.button<{ isHovered: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.2s;
    color: ${props => props.isHovered ? colors.primary.main : colors.neutral[400]};
    background-color: ${props => props.isHovered ? colors.primary.light : 'transparent'};
`;

export const FeedContainer = styled(Container)`
    background-color: ${colors.neutral[50]};
    color: ${colors.neutral[800]};
`;

export const Header = styled.header`
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    padding-top: 1.5rem;
    padding-bottom: 1rem;
    background-color: ${colors.neutral[50]};
    z-index: 10;
    backdrop-filter: blur(8px);

    &::after {
        content: '';
        position: absolute;
        bottom: -20px;
        left: 0;
        right: 0;
        height: 20px;
        background: linear-gradient(to bottom,
        ${colors.neutral[50]},
        rgba(249, 250, 251, 0.8),
        rgba(249, 250, 251, 0.4),
        rgba(249, 250, 251, 0)
        );
        pointer-events: none;
    }

    @media (min-width: 1024px) {
        padding-top: 2rem;
    }
`;

export const HeaderContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem 0 0.7rem;
    width: 100%;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        bottom: -0.7rem;
        left: 10%;
        right: 10%;
        background: ${colors.neutral[200]};
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        opacity: 0.7;
    }
`;

export const DateNavigation = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin: 0 auto;
    width: fit-content;
`;

export const FeedContentWrapper = styled(ContentWrapper)`
    padding-left: 0;
    padding-right: 0;
    justify-content: flex-start;
    overflow-y: auto;
    height: 100%;
    max-width: 100%;
    position: relative;
    padding-top: 0.5rem;
`;

export const MainContent = styled.main`
    padding: 1.5rem 1rem 1rem;
    max-width: 640px;
    margin: 0 auto;
    width: 100%;
`;

export const HeaderContainer = styled.div`
    margin-bottom: 1.5rem;
`;

export const GroupTitle = styled.h1`
    font-size: 1.5rem;
    font-weight: 700;
    color: ${colors.neutral[800]};
    margin-bottom: 0.25rem;
`;

export const GradientText = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(to right, #86dbf8, #005ac1);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
`;

export const AnnouncementBox = styled.div`
    background-color: ${colors.primary.light};
    padding: 0.75rem 1rem;
    border-radius: 0 1rem 1rem 1rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    position: relative;
    border: 1px solid rgba(59, 130, 246, 0.1);
`;

export const AnnouncementIcon = styled.div`
    margin-right: 0.5rem;
    color: ${colors.primary.main};
    display: flex;
    align-items: center;
`;

export const AnnouncementText = styled.p`
    font-size: 0.875rem;
    color: ${colors.neutral[600]};
    line-height: 1.4;
`;

export const PostsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin-bottom: 2rem;
`;

export const PostCard = styled.div<{ bgColor: string }>`
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.8rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    position: relative;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
    border: 1px solid ${colors.neutral[200]};

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
    }

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 0.35rem;
        height: 100%;
        background: ${props => getCardAccentColor(props.bgColor)};
    }
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: ${colors.neutral[500]};
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    z-index: 1;

    &:hover {
        background-color: ${colors.neutral[200]};
        color: ${colors.neutral[700]};
    }
`;

export const ProfileSection = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1.25rem;
    position: relative;
    z-index: 1;
`;

export const ProfileImage = styled.img`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin-right: 0.875rem;
    object-fit: cover;
    border: 2px solid ${colors.primary.light};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const ProfileImageWithBorder = styled(ProfileImage)`
    background-color: white;
    padding: 0.125rem;
    border: 2px solid ${colors.secondary.light};
`;

export const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

export const UserName = styled.p`
    font-weight: 700;
    font-size: 1.125rem;
    margin-bottom: 0.125rem;
    color: ${colors.neutral[800]};
`;

export const UserGroup = styled.p`
    font-size: 0.875rem;
    color: ${colors.neutral[500]};
`;

export const PostContent = styled.p`
    margin-bottom: 1.5rem;
    font-size: 1.125rem;
    line-height: 1.6;
    position: relative;
    z-index: 1;
    color: ${colors.neutral[700]};
    font-weight: 500;
`;

export const ReactionContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.625rem;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
    padding-top: 1rem;
`;

export const ReactionBadge = styled.div`
    display: flex;
    align-items: center;
    background-color: ${colors.neutral[100]};
    color: ${colors.neutral[700]};
    border-radius: 9999px;
    padding: 0.375rem 0.875rem;
    transition: all 0.15s;
    border: 1px solid ${colors.neutral[200]};

    &:hover {
        transform: scale(1.05);
        background-color: ${colors.primary.light};
        border-color: ${colors.primary.light};
    }
`;

export const EmojiIcon = styled.span`
    font-size: 0.75rem;
`;

export const ReactionCount = styled.span`
    margin-left: 0.375rem;
    font-weight: 600;
    font-size: 0.7rem;
`;

export const ReactionButton = styled.button`
    background-color: ${colors.neutral[100]};
    color: ${colors.neutral[600]};
    border-radius: 9999px;
    width: 2.25rem;
    height: 2.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
    border: 1px solid ${colors.neutral[200]};

    &:hover {
        transform: scale(1.05);
        background-color: ${colors.primary.light};
        color: ${colors.primary.main};
        border-color: ${colors.primary.light};
    }
`;

export const FloatingButton = styled.button`
    background: ${colors.primary.gradient};
    color: white;
    width: 4rem;
    height: 4rem;
    border-radius: 9999px;
    box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3), 0 4px 6px -2px rgba(59, 130, 246, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 4rem;
    right: 1.5rem;
    transition: all 0.2s;

    &:hover {
        transform: translateY(-2px) scale(1.05);
        box-shadow: 0 15px 20px -3px rgba(59, 130, 246, 0.4), 0 6px 8px -2px rgba(59, 130, 246, 0.3);
    }

    &:active {
        transform: translateY(0) scale(0.98);
    }
`;