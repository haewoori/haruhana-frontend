import { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import {
    DatePickerContainer,
    CalendarWrapper,
    CalendarHeader,
    CalendarTitle,
    CalendarGrid,
    CalendarDay,
    CalendarDayHeader,
    DateButton
} from './Calendar.style';

const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'];

export type CalendarSize = 'regular' | 'small';

interface CalendarProps {
    selectedDate: Date;
    onDateSelect: (date: Date) => void;
    containerRef: React.RefObject<HTMLDivElement>;
    size?: CalendarSize;
}

const Calendar = ({
                      selectedDate,
                      onDateSelect,
                      containerRef,
                      size = 'regular'
                  }: CalendarProps) => {
    const [calendarMonth, setCalendarMonth] = useState(selectedDate.getMonth());
    const [calendarYear, setCalendarYear] = useState(selectedDate.getFullYear());
    const [calendarDays, setCalendarDays] = useState<Array<{date: Date, isCurrentMonth: boolean}>>([]);

    const getDaysInMonth = (year: number, month: number) => {
        const date = new Date(year, month, 1);
        const days = [];

        const firstDay = date.getDay();
        const prevMonthLastDate = new Date(year, month, 0).getDate();

        for (let i = firstDay - 1; i >= 0; i--) {
            days.push({
                date: new Date(year, month - 1, prevMonthLastDate - i),
                isCurrentMonth: false
            });
        }

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({
                date: new Date(year, month, i),
                isCurrentMonth: true
            });
        }

        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            days.push({
                date: new Date(year, month + 1, i),
                isCurrentMonth: false
            });
        }

        return days;
    };

    useEffect(() => {
        setCalendarDays(getDaysInMonth(calendarYear, calendarMonth));
    }, [calendarYear, calendarMonth]);

    const changeCalendarMonth = (delta: number) => {
        const newDate = new Date(calendarYear, calendarMonth + delta, 1);
        setCalendarMonth(newDate.getMonth());
        setCalendarYear(newDate.getFullYear());
    };

    return (
        <DatePickerContainer ref={containerRef} size={size}>
            <CalendarWrapper size={size}>
                <CalendarHeader>
                    <DateButton
                        isHovered={false}
                        onMouseEnter={() => {}}
                        onMouseLeave={() => {}}
                        onClick={() => changeCalendarMonth(-1)}
                        aria-label="이전 달"
                        size={size}
                    >
                        <IoIosArrowBack size={size === 'small' ? 10 : 16} />
                    </DateButton>
                    <CalendarTitle size={size}>
                        {calendarYear}년 {calendarMonth + 1}월
                    </CalendarTitle>
                    <DateButton
                        isHovered={false}
                        onMouseEnter={() => {}}
                        onMouseLeave={() => {}}
                        onClick={() => changeCalendarMonth(1)}
                        aria-label="다음 달"
                        size={size}
                    >
                        <IoIosArrowForward size={size === 'small' ? 10 : 16} />
                    </DateButton>
                </CalendarHeader>

                <CalendarGrid size={size}>
                    {DAYS_OF_WEEK.map(day => (
                        <CalendarDayHeader key={day} size={size}>{day}</CalendarDayHeader>
                    ))}

                    {calendarDays.map((day, index) => {
                        const isSelected =
                            day.date.getDate() === selectedDate.getDate() &&
                            day.date.getMonth() === selectedDate.getMonth() &&
                            day.date.getFullYear() === selectedDate.getFullYear();

                        const isToday =
                            day.date.getDate() === new Date().getDate() &&
                            day.date.getMonth() === new Date().getMonth() &&
                            day.date.getFullYear() === new Date().getFullYear();

                        return (
                            <CalendarDay
                                key={index}
                                isCurrentMonth={day.isCurrentMonth}
                                isSelected={isSelected}
                                isToday={isToday}
                                onClick={() => onDateSelect(day.date)}
                                size={size}
                            >
                                {day.date.getDate()}
                            </CalendarDay>
                        );
                    })}
                </CalendarGrid>
            </CalendarWrapper>
        </DatePickerContainer>
    );
};

export default Calendar;