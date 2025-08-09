import React, { useState, useCallback, useRef, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Calendar from '@/components/Calendar/Calendar';
import { formatDate } from '@/utils/dateUtils';
import {
    HeaderContainer,
    HeaderContent,
    DateNavigation,
    DateButton,
    DateText,
    Colors
} from './Header.style';

interface HeaderProps {
    currentDate: Date;
    setCurrentDate: (date: Date) => void;
    colors: Colors;
}

const Header: React.FC<HeaderProps> = ({ currentDate, setCurrentDate, colors }) => {
    const [leftArrowHovered, setLeftArrowHovered] = useState(false);
    const [rightArrowHovered, setRightArrowHovered] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);

    // 날짜 변경 함수
    const changeDate = useCallback((days: number) => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + days);
        setCurrentDate(newDate);
    }, [currentDate, setCurrentDate]);

    // 캘린더에서 날짜 선택 함수
    const selectDate = useCallback((date: Date) => {
        setCurrentDate(date);
        setShowCalendar(false);
    }, [setCurrentDate]);

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

    return (
        <HeaderContainer colors={colors}>
            <HeaderContent colors={colors}>
                <DateNavigation>
                    <DateButton
                        colors={colors}
                        isHovered={leftArrowHovered}
                        onMouseEnter={() => setLeftArrowHovered(true)}
                        onMouseLeave={() => setLeftArrowHovered(false)}
                        onClick={() => changeDate(-1)}
                        aria-label="이전 날짜"
                    >
                        <IoIosArrowBack size={18} />
                    </DateButton>
                    <DateText 
                        colors={colors} 
                        onClick={() => setShowCalendar(!showCalendar)}
                    >
                        {formatDate(currentDate)}
                    </DateText>
                    <DateButton
                        colors={colors}
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
        </HeaderContainer>
    );
};

export default Header;