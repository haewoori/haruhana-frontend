import styled from '@emotion/styled';
import { colors } from '@/app/feed/page.style';

export const StudyCreateModalContent = styled.div`
  padding: 1.5rem;
  max-height: 72vh;
  overflow-y: auto;
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
  position: relative;
`;

export const RowFormGroup = styled(FormGroup)`
  flex: 1;
    margin-bottom: 0;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
  gap: 1rem;
  }
`;

export const FormLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${colors.neutral[700]};
  margin-bottom: 0.5rem;
`;

export const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.hasError ? colors.error : colors.neutral[300]};
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? colors.error : colors.primary.main};
    box-shadow: 0 0 0 2px ${props => props.hasError ? colors.error + '30' : colors.primary.light + '30'};
  }
`;

export const DateInput = styled(Input)`
  cursor: pointer;
`;

export const NumberInput = styled(Input)`
  max-width: 120px;
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export const RadioOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  input[type="radio"] {
    cursor: pointer;
  }
`;

export const RadioLabel = styled.label`
  font-size: 0.875rem;
  color: ${colors.neutral[700]};
  cursor: pointer;
`;

export const ErrorMessage = styled.p`
  color: ${colors.error};
  font-size: 0.75rem;
  margin: 0;
  flex: 1;
  padding-right: 1rem;
`;

export const CharCount = styled.div`
  font-size: 0.75rem;
  color: ${colors.neutral[500]};
  margin-left: auto;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const MessageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 1.5rem;
  margin-top: 0.25rem;
`;

export const ReadOnlyDateDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid ${colors.neutral[300]};
  border-radius: 0.375rem;
  background-color: ${colors.neutral[100]};
  color: ${colors.neutral[400]};
  font-size: 0.875rem;
  
  svg {
    color: ${colors.neutral[400]};
  }
  
  span {
    font-weight: 400;
  }
`;
