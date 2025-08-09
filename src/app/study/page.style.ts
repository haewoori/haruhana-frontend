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
    info: '#3B82F6',
    status: {
        recruiting: '#10B981',
        completed: '#6B7280',
        canceled: '#EF4444'
    }
};

export const StudyContainer = styled(Container)`
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

export const StudyContentWrapper = styled(ContentWrapper)`
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

// 필터 관련 스타일 컴포넌트 추가
export const FilterContainer = styled.div`
    display: flex;
  margin-bottom: 1.5rem;
    gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (min-width: 640px) {
    flex-wrap: wrap;
    overflow-x: visible;
  }
`;

export const FilterButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
  transition: all 0.2s;
  
  ${props => props.active
    ? `
      background-color: ${colors.primary.main};
      color: white;
      box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
    `
    : `
      background-color: ${colors.neutral[100]};
      color: ${colors.neutral[600]};
      
      &:hover {
        background-color: ${colors.neutral[200]};
        color: ${colors.neutral[700]};
      }
    `
}
`;

export const FilterBadge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 1.5rem;
  height: 1.5rem;
  padding: 0 0.375rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  background-color: white;
  color: ${colors.primary.main};
  margin-left: 0.25rem;
`;

export const FilterDivider = styled.div`
  height: 2rem;
  width: 1px;
  background-color: ${colors.neutral[200]};
  margin: 0 0.5rem;
`;

export const ClearFiltersButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${colors.neutral[600]};
  transition: all 0.2s;
  
  &:hover {
    color: ${colors.neutral[800]};
    background-color: ${colors.neutral[100]};
  }
`;

export const StudyListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin-bottom: 2rem;
`;

export const StudyCard = styled.div`
    background-color: white;
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
`;

export const CardHeader = styled.div`
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${colors.neutral[100]};
`;

export const CardBody = styled.div`
    padding: 1.5rem;
    cursor: pointer;
`;

export const CardFooter = styled.div`
    padding: 1rem 1.5rem;
    border-top: 1px solid ${colors.neutral[100]};
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const StatusTag = styled.span<{ status: 'recruiting' | 'completed' | 'canceled' }>`
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    background-color: ${props => {
    switch(props.status) {
        case 'recruiting': return colors.status.recruiting + '20';
        case 'completed': return colors.status.completed + '20';
        case 'canceled': return colors.status.canceled + '20';
        default: return colors.neutral[200];
    }
}};
    color: ${props => {
    switch(props.status) {
        case 'recruiting': return colors.status.recruiting;
        case 'completed': return colors.status.completed;
        case 'canceled': return colors.status.canceled;
        default: return colors.neutral[600];
    }
}};
`;

export const TagsContainer = styled.div`
    display: flex;
    gap: 0.5rem;
`;

export const StudyTypeTag = styled.span<{ type: 'certificate' | 'hobby' }>`
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    background-color: ${props => props.type === 'certificate' ? colors.secondary.light : colors.cardColors.purple.color + '20'};
    color: ${props => props.type === 'certificate' ? colors.secondary.dark : colors.cardColors.purple.color};
`;

export const OnlineTag = styled.span<{ isOnline: boolean }>`
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    background-color: ${props => props.isOnline ? colors.cardColors.green.color + '20' : colors.cardColors.orange.color + '20'};
    color: ${props => props.isOnline ? colors.cardColors.green.color : colors.cardColors.orange.color};
`;

export const ProfileSection = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
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

export const StudyTitle = styled.h3`
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.7rem;
    color: ${colors.neutral[800]};
`;

export const StudyInfoContainer = styled.div`
    display: flex;
    gap: 1.5rem;
    margin-bottom: 0.3rem;
`;

export const StudyInfoItem = styled.div`
    display: flex;
    align-items: center;
`;

export const StudyInfoLabel = styled.span`
    font-size: 0.875rem;
    color: ${colors.neutral[500]};
    margin-right: 0.5rem;
`;

export const StudyInfoValue = styled.span`
    font-size: 0.875rem;
    font-weight: 500;
    color: ${colors.neutral[700]};
`;

export const MemberCount = styled.div`
    display: flex;
    align-items: center;
    gap: 0.3rem;
`;

export const MemberCountValue = styled.span`
    font-size: 0.875rem;
    font-weight: 600;
    color: ${colors.neutral[800]};
`;

export const Deadline = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const DeadlineValue = styled.span`
    font-size: 0.875rem;
    font-weight: 500;
    color: ${colors.neutral[700]};
    margin-top: 0.1rem;
`;

export const ModalContent = styled.div`
    padding: 1rem 0;
`;

export const MemberList = styled.div`
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
`;

export const MemberListTitle = styled.h4`
    font-size: 0.875rem;
    font-weight: 600;
    color: ${colors.neutral[600]};
    margin-bottom: 0.75rem;
`;

export const MemberListItems = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
`;

export const MemberItem = styled.div`
    display: flex;
    align-items: center;
    padding: 0.375rem 0.75rem;
    background-color: ${colors.neutral[100]};
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    color: ${colors.neutral[700]};
`;

export const StudyDescription = styled.p`
    font-size: 0.9375rem;
    line-height: 1.6;
    color: ${colors.neutral[700]};
    margin-bottom: 1.5rem;
    white-space: pre-line;
`;

export const ApplyButton = styled.button<{ isMine?: boolean }>`
    width: 100%;
    padding: 0.75rem;
    font-weight: 600;
    font-size: 0.9375rem;
    border-radius: 0.5rem;
    transition: all 0.2s;
    
    ${props => props.isMine
    ? `
            background-color: ${colors.neutral[100]};
            color: ${colors.neutral[600]};
            
            &:hover {
                background-color: ${colors.neutral[200]};
            }
        `
    : `
            background-color: ${colors.primary.main};
            color: white;
            
            &:hover {
                background-color: ${colors.primary.dark};
            }
        `
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
    bottom: 6rem;
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

export const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
    text-align: center;
`;

export const LoadingSpinner = styled.div`
    display: inline-block;
    width: 2.5rem;
    height: 2.5rem;
    border: 3px solid ${colors.neutral[200]};
    border-radius: 50%;
    border-top-color: ${colors.primary.main};
    animation: spin 1s ease-in-out infinite;
    margin: 2rem auto;
    
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

export const EmptyStateText = styled.p`
    color: ${colors.neutral[500]};
    font-size: 1rem;
    text-align: center;
    padding: 2rem 0;
    line-height: 1.5;
`;

export const ErrorText = styled.p`
    color: ${colors.error};
    font-size: 1rem;
    text-align: center;
    padding: 2rem 0;
    line-height: 1.5;
`;

export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
`;

export const ModalWrapper = styled.div`
    background-color: white;
    border-radius: 1rem;
    width: 100%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
`;

export const ModalHeader = styled.div`
    padding: 1.5rem;
    border-bottom: 1px solid ${colors.neutral[200]};
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ModalTitle = styled.h2`
    font-size: 1.25rem;
    font-weight: 700;
    color: ${colors.neutral[800]};
`;

export const ModalCloseButton = styled.button`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colors.neutral[500]};
    transition: all 0.2s;
    
    &:hover {
        background-color: ${colors.neutral[100]};
        color: ${colors.neutral[700]};
    }
`;

export const ModalBody = styled.div`
    padding: 1.5rem;
    flex: 1;
`;

export const ModalFooter = styled.div`
    padding: 1.5rem;
    border-top: 1px solid ${colors.neutral[200]};
    position: sticky;
    bottom: 0;
    background-color: white;
    z-index: 1;
`;

export const StatusIndicator = styled.div<{ isApplied: boolean; status: 'recruiting' | 'completed' | 'canceled' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ApplyBadge = styled.div<{ isApplied: boolean; status: 'recruiting' | 'completed' | 'canceled' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.2s;
  
  ${props => {
    if (props.isApplied) {
        return `
        background-color: ${colors.primary.light};
        color: ${colors.primary.main};
        border: 1px solid ${colors.primary.main}20;
      `;
    } else if (props.status === 'recruiting') {
        return `
        background-color: ${colors.status.recruiting}10;
        color: ${colors.status.recruiting};
        border: 1px solid ${colors.status.recruiting}20;
      `;
    } else if (props.status === 'completed') {
        return `
        background-color: ${colors.neutral[200]};
        color: ${colors.neutral[600]};
        border: 1px solid ${colors.neutral[300]};
      `;
    } else {
        return `
        background-color: ${colors.status.canceled}10;
        color: ${colors.status.canceled};
        border: 1px solid ${colors.status.canceled}20;
      `;
    }
}}
`;

export const CardActions = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  justify-content: flex-end;
`;

export const ViewDetailsButton = styled.button`
  background-color: ${colors.neutral[100]};
  color: ${colors.neutral[700]};
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${colors.neutral[200]};
  }
`;
