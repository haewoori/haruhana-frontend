import { useState, useRef, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
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
  ColorOptions,
  ColorOption
} from './PostModal.style';
import { cardColorOptions } from '@/app/feed/page.style';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (content: string, color: string) => void;
}

const PostModal = ({ isOpen, onClose, onSave }: PostModalProps) => {
  const [content, setContent] = useState('');
  const [selectedColor, setSelectedColor] = useState('blue');
  const modalRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSave = () => {
    if (content.trim()) {
      onSave(content, selectedColor);
      setContent('');
      setSelectedColor('blue');
    }
  };

  const handleCancel = () => {
    setContent('');
    setSelectedColor('blue');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer ref={modalRef}>
        <ModalHeader>
          <ModalTitle>새 글 작성하기</ModalTitle>
          <CloseButton onClick={onClose}>
            <MdClose size={20} />
          </CloseButton>
        </ModalHeader>
        <ModalContent>
          <TextArea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="무슨 생각을 하고 계신가요?"
            maxLength={500}
          />
          <ColorOptions>
            {cardColorOptions.map((color) => (
              <ColorOption
                key={color.id}
                color={color.value}
                isSelected={selectedColor === color.id}
                onClick={() => setSelectedColor(color.id)}
                aria-label={`${color.name} 색상 선택`}
              />
            ))}
          </ColorOptions>
          <ButtonContainer>
            <CancelButton onClick={handleCancel}>취소</CancelButton>
            <SaveButton 
              onClick={handleSave} 
              disabled={!content.trim()}
              color={selectedColor}
            >
              저장
            </SaveButton>
          </ButtonContainer>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default PostModal;