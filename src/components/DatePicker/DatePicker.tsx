import { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { MdCalendarToday } from 'react-icons/md';
import Calendar, { CalendarSize } from '@/components/Calendar/Calendar';
import { DatePickerContainer, DateInput, CalendarIcon, DatePickerWrapper } from './DatePicker.style';

interface DatePickerProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  max?: string;
  hasError?: boolean;
  placeholder?: string;
  calendarSize?: CalendarSize; // 캘린더 크기 옵션 추가
}

const DatePicker = ({
                      id,
                      name,
                      value,
                      onChange,
                      min,
                      max,
                      hasError,
                      placeholder = '날짜 선택',
                      calendarSize = 'regular'
                    }: DatePickerProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(value ? new Date(value) : new Date());
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 외부 클릭 시 캘린더 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // value 변경 시 selectedDate 업데이트
  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value));
    }
  }, [value]);

  // 날짜 선택 시 처리
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowCalendar(false);

    const dateString = format(date, 'yyyy-MM-dd');
    const event = {
      target: {
        name,
        value: dateString,
        type: 'date'
      }
    } as React.ChangeEvent<HTMLInputElement>;

    onChange(event);
  };

  // 입력 필드 클릭 시 캘린더 토글
  const handleInputClick = () => {
    setShowCalendar(prev => !prev);
  };

  // 표시용 날짜 포맷
  const displayDate = value
      ? format(new Date(value), 'yyyy년 MM월 dd일', { locale: ko })
      : '';

  return (
      <DatePickerWrapper ref={containerRef}>
        <DatePickerContainer>
          <DateInput
              id={id}
              ref={inputRef}
              type="text"
              readOnly
              value={displayDate}
              placeholder={placeholder}
              onClick={handleInputClick}
              hasError={hasError}
          />
          <CalendarIcon onClick={handleInputClick}>
            <MdCalendarToday size={18} />
          </CalendarIcon>

          <input
              type="hidden"
              name={name}
              value={value}
          />
        </DatePickerContainer>

        {showCalendar && (
            <Calendar
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                containerRef={containerRef}
                size={calendarSize}
            />
        )}
      </DatePickerWrapper>
  );
};

export default DatePicker;