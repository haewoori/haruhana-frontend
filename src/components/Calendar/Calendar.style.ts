import styled from "@emotion/styled";

export const colors = {
    primary: {
        light: '#EBF4FF',
        main: '#3B82F6',
        dark: '#1E40AF',
        gradient: 'linear-gradient(135deg, #60A5FA, #2563EB)'
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
    }
};

export const DatePickerContainer = styled.div`
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 50%;
    transform: translateX(-50%);
    z-index: 20;
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
`;

export const CalendarWrapper = styled.div`
    background-color: white;
    border-radius: 1rem;
    padding: 1rem;
    width: 320px;
    border: 1px solid ${colors.neutral[200]};
`;

export const CalendarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;

export const CalendarTitle = styled.div`
    font-weight: 600;
    color: ${colors.neutral[800]};
`;

export const CalendarGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;
`;

export const CalendarDayHeader = styled.div`
    text-align: center;
    font-size: 0.75rem;
    font-weight: 600;
    color: ${colors.neutral[500]};
    padding: 0.5rem 0;
`;

interface CalendarDayProps {
    isCurrentMonth: boolean;
    isSelected: boolean;
    isToday: boolean;
}

export const CalendarDay = styled.button<CalendarDayProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
    
    color: ${props => props.isCurrentMonth ? colors.neutral[700] : colors.neutral[400]};
    
    background-color: ${props => props.isSelected ? colors.primary.main : 'transparent'};
    color: ${props => props.isSelected ? 'white' : props.isCurrentMonth ? colors.neutral[700] : colors.neutral[400]};
    font-weight: ${props => props.isSelected ? '600' : '400'};
    
    border: ${props => props.isToday && !props.isSelected ? `2px solid ${colors.primary.main}` : 'none'};
    
    &:hover {
        background-color: ${props => props.isSelected ? colors.primary.main : colors.neutral[100]};
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