import { useState, useRef, useEffect } from 'react';
import { MdClose, MdCheck, MdAccessTime, MdPerson, MdToday } from 'react-icons/md';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalContent,
  TextArea,
  ButtonContainer,
  CancelButton,
  SaveButton,
} from '@/components/PostModal/PostModal.style';
import {
  FormGroup,
  RowFormGroup,
  FormLabel,
  Input,
  RadioGroup,
  RadioOption,
  RadioLabel,
  ErrorMessage,
  DateInput,
  NumberInput,
  FormRow,
  StudyCreateModalContent,
  CharCount,
  InputContainer,
  MessageContainer,
  ReadOnlyDateDisplay
} from './StudyCreateModal.style';
import DatePicker from '@/components/DatePicker/DatePicker';
import { createStudy } from '@/api/study/createStudyApi';
import { useToast } from '@/hooks/useToast';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { StudyType, studyTypeToApiCategory } from '@/types/study/study';

interface StudyCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (studyData: StudyFormData) => void;
  onSuccess?: () => void;
}

export interface StudyFormData {
  title: string;
  description: string;
  type: StudyType;
  isOnline: boolean;
  totalMembers: number;
  startDate: string;
  deadline: string;
}

const StudyCreateModal = ({ isOpen, onClose, onSave, onSuccess }: StudyCreateModalProps) => {
  const getTodayDate = (): string => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const initialFormData: StudyFormData = {
    title: '',
    description: '',
    type: StudyType.CERTIFICATE,
    isOnline: true,
    totalMembers: 5,
    startDate: getTodayDate(),
    deadline: '',
  };

  const [formData, setFormData] = useState<StudyFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof StudyFormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof StudyFormData, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const { showToast } = useToast();

  // 모달이 열릴 때마다 startDate를 오늘 날짜로 재설정
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        startDate: getTodayDate()
      }));
    }
  }, [isOpen]);

  // 모달이 열리면 타이틀 입력 필드에 포커스
  useEffect(() => {
    if (isOpen && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isOpen]);

  // 모달 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleCancel();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // 입력값 변경 핸들러
  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (name === 'startDate') return;

    if (type === 'number') {
      const numValue = parseInt(value, 10);
      setFormData((prev) => ({
        ...prev,
        [name]: isNaN(numValue) ? '' : Math.max(1, Math.min(numValue, 100))
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setTouched((prev) => ({ ...prev, [name]: true }));

    validateField(name, type === 'number' ? parseInt(value, 10) : value);
  };

  // 라디오 버튼 변경 핸들러
  const handleRadioChange = (name: keyof StudyFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  // 타입 선택 처리 함수
  const handleTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      type: value === 'certificate' ? StudyType.CERTIFICATE : StudyType.HOBBY
    }));
    setTouched((prev) => ({ ...prev, type: true }));
    validateField('type', value);
  };

  // 단일 필드 유효성 검사
  const validateField = (name: string, value: any) => {
    let newErrors = { ...errors };

    switch (name) {
      case 'title':
        if (!value.trim()) {
          newErrors.title = '스터디명을 입력해주세요';
        } else if (value.length > 50) {
          newErrors.title = '스터디명은 최대 50자까지 입력 가능합니다';
        } else {
          delete newErrors.title;
        }
        break;
      case 'deadline':
        if (!value) {
          newErrors.deadline = '모집 마감일을 선택해주세요';
        } else if (formData.startDate && new Date(value) < new Date(formData.startDate)) {
          newErrors.deadline = '마감일은 시작일 이후여야 합니다';
        } else {
          delete newErrors.deadline;
        }
        break;
      case 'totalMembers':
        if (!value || value < 2) {
          newErrors.totalMembers = '모집 인원은 최소 2명 이상이어야 합니다';
        } else if (value > 100) {
          newErrors.totalMembers = '모집 인원은 최대 100명까지 가능합니다';
        } else {
          delete newErrors.totalMembers;
        }
        break;
      case 'description':
        if (!value.trim()) {
          newErrors.description = '스터디 내용을 입력해주세요';
        } else if (value.length > 1000) {
          newErrors.description = '스터디 내용은 최대 1000자까지 입력 가능합니다';
        } else {
          delete newErrors.description;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 전체 폼 유효성 검사
  const validateForm = (): boolean => {
    let isValid = true;
    let newErrors: Partial<Record<keyof StudyFormData, string>> = {};
    let newTouched: Partial<Record<keyof StudyFormData, boolean>> = {};

    Object.keys(formData).forEach(key => {
      if (key !== 'startDate') {
        newTouched[key as keyof StudyFormData] = true;
      }
    });
    setTouched(newTouched);

    // 필수 입력 필드 검증
    if (!formData.title.trim()) {
      newErrors.title = '스터디명을 입력해주세요';
      isValid = false;
    } else if (formData.title.length > 50) {
      newErrors.title = '스터디명은 최대 50자까지 입력 가능합니다';
      isValid = false;
    }

    if (!formData.deadline) {
      newErrors.deadline = '모집 마감일을 선택해주세요';
      isValid = false;
    } else if (formData.startDate && new Date(formData.deadline) < new Date(formData.startDate)) {
      newErrors.deadline = '마감일은 시작일 이후여야 합니다';
      isValid = false;
    }

    if (!formData.totalMembers || formData.totalMembers < 2) {
      newErrors.totalMembers = '모집 인원은 최소 2명 이상이어야 합니다';
      isValid = false;
    } else if (formData.totalMembers > 100) {
      newErrors.totalMembers = '모집 인원은 최대 100명까지 가능합니다';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = '스터디 내용을 입력해주세요';
      isValid = false;
    } else if (formData.description.length > 1000) {
      newErrors.description = '스터디 내용은 최대 1000자까지 입력 가능합니다';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // 저장 버튼 클릭 핸들러
  const handleSave = async () => {
    if (!validateForm() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      onSave(formData);

      const apiCategory = studyTypeToApiCategory(formData.type);
      await createStudy(
          formData.title,
          formData.description,
          formData.totalMembers,
          formData.deadline,
          apiCategory,
          formData.isOnline
      );

      showToast?.('스터디가 성공적으로 등록되었습니다', 'success');
      onSuccess?.();
      resetForm();
      onClose();
    } catch (error) {
      console.error('스터디 생성 중 오류 발생:', error);
      showToast?.('스터디 등록에 실패했습니다. 다시 시도해주세요.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 취소 버튼 클릭 핸들러
  const handleCancel = () => {
    resetForm();
    onClose();
  };

  // 폼 초기화
  const resetForm = () => {
    setFormData({
      ...initialFormData,
      startDate: getTodayDate()
    });
    setErrors({});
    setTouched({});
  };

  // 현재 날짜 이후의 날짜만 선택 가능하도록 최소 날짜 설정
  const getMinDate = (): string => {
    return getTodayDate();
  };

  // 날짜를 표시 형식으로 변환
  const formatDisplayDate = (dateString: string): string => {
    if (!dateString) return '';
    return format(new Date(dateString), 'yyyy년 MM월 dd일', { locale: ko });
  };

  if (!isOpen) return null;

  return (
      <ModalOverlay>
        <ModalContainer ref={modalRef}>
          <ModalHeader>
            <ModalTitle>모집하기</ModalTitle>
            <CloseButton onClick={handleCancel}>
              <MdClose size={20} />
            </CloseButton>
          </ModalHeader>
          <StudyCreateModalContent>
            <FormGroup>
              <FormLabel htmlFor="title">스터디명</FormLabel>
              <InputContainer>
                <Input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    ref={titleInputRef}
                    hasError={!!errors.title && touched.title}
                    placeholder="스터디 제목을 입력해주세요"
                    maxLength={50}
                />
              </InputContainer>
              <MessageContainer>
                {touched.title && errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
                <CharCount>{formData.title.length}/50</CharCount>
              </MessageContainer>
            </FormGroup>

            <FormRow>
              <RowFormGroup>
                <FormLabel>스터디 유형</FormLabel>
                <RadioGroup>
                  <RadioOption>
                    <input
                        type="radio"
                        id="certificate"
                        name="type"
                        checked={formData.type === StudyType.CERTIFICATE}
                        onChange={() => handleTypeChange('certificate')}
                    />
                    <RadioLabel htmlFor="certificate">자격증</RadioLabel>
                  </RadioOption>
                  <RadioOption>
                    <input
                        type="radio"
                        id="hobby"
                        name="type"
                        checked={formData.type === StudyType.HOBBY}
                        onChange={() => handleTypeChange('hobby')}
                    />
                    <RadioLabel htmlFor="hobby">취미</RadioLabel>
                  </RadioOption>
                </RadioGroup>
              </RowFormGroup>

              <RowFormGroup>
                <FormLabel>진행 방식</FormLabel>
                <RadioGroup>
                  <RadioOption>
                    <input
                        type="radio"
                        id="online"
                        name="isOnline"
                        checked={formData.isOnline}
                        onChange={() => handleRadioChange('isOnline', true)}
                    />
                    <RadioLabel htmlFor="online">온라인</RadioLabel>
                  </RadioOption>
                  <RadioOption>
                    <input
                        type="radio"
                        id="offline"
                        name="isOnline"
                        checked={!formData.isOnline}
                        onChange={() => handleRadioChange('isOnline', false)}
                    />
                    <RadioLabel htmlFor="offline">오프라인</RadioLabel>
                  </RadioOption>
                </RadioGroup>
              </RowFormGroup>
            </FormRow>

            <FormRow>
              <RowFormGroup>
                <FormLabel htmlFor="startDate">모집 시작일</FormLabel>
                <ReadOnlyDateDisplay>
                  <MdToday size={18} />
                  <span>{formatDisplayDate(formData.startDate)}</span>
                </ReadOnlyDateDisplay>
                <input type="hidden" name="startDate" value={formData.startDate} />
              </RowFormGroup>

              <RowFormGroup>
                <FormLabel htmlFor="deadline">모집 마감일</FormLabel>
                <DatePicker
                    id="deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    min={formData.startDate}
                    hasError={!!errors.deadline && touched.deadline}
                    placeholder="마감일 선택"
                    calendarSize="small"
                />
                {touched.deadline && errors.deadline && <ErrorMessage>{errors.deadline}</ErrorMessage>}
              </RowFormGroup>
            </FormRow>

            <FormGroup>
              <FormLabel htmlFor="totalMembers">
                모집 인원수
              </FormLabel>
              <NumberInput
                  id="totalMembers"
                  name="totalMembers"
                  type="number"
                  min="2"
                  max="100"
                  value={formData.totalMembers}
                  onChange={handleChange}
                  hasError={!!errors.totalMembers && touched.totalMembers}
              />
              {touched.totalMembers && errors.totalMembers && <ErrorMessage>{errors.totalMembers}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="description">스터디 내용</FormLabel>
              <InputContainer>
                <TextArea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="스터디 진행 방식, 일정, 목표 등을 설명해주세요"
                    maxLength={1000}
                    style={{
                      borderColor: touched.description && errors.description ? '#f56565' : undefined
                    }}
                />
              </InputContainer>
              <MessageContainer>
                {touched.description && errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
                <CharCount>{formData.description.length}/1000</CharCount>
              </MessageContainer>
            </FormGroup>
            <ButtonContainer>
              <CancelButton onClick={handleCancel}>취소</CancelButton>
              <SaveButton
                  onClick={handleSave}
                  disabled={Object.keys(errors).length > 0 || isSubmitting}
                  color="blue"
              >
                {isSubmitting ? '저장 중...' : '저장'}
              </SaveButton>
            </ButtonContainer>
          </StudyCreateModalContent>
        </ModalContainer>
      </ModalOverlay>
  );
};

export default StudyCreateModal;