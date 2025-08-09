import styled from '@emotion/styled';
import { Input } from '@/components/StudyCreateModal/StudyCreateModal.style';
import { colors } from '@/app/feed/page.style';

export const DatePickerWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const DatePickerContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const DateInput = styled(Input)`
  padding-right: 2.5rem;
  cursor: pointer;
`;

export const CalendarIcon = styled.div`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${colors.neutral[500]};
  cursor: pointer;
  
  &:hover {
    color: ${colors.primary.main};
  }
`;