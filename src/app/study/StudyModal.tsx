'use client';

import { useRef, useEffect } from 'react';
import { MdClose, MdDelete } from 'react-icons/md';
import {StudyStatusType, StudyMember, Study} from '@/types/study/study';
import {
    ModalContainer,
    ModalWrapper,
    ModalHeader,
    ModalTitle,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    MemberList,
    MemberListTitle,
    MemberListItems,
    MemberItem,
    StudyContent,
    ApplyButton,
} from './page.style';

interface StudyModalProps {
    isOpen: boolean;
    onClose: () => void;
    study: Study | null;
    onApply: (studyId: string) => void;
    onCancelApply: (studyId: string) => void;
    onDelete: (studyCardId: string, event?: React.MouseEvent) => Promise<void>;
}

const StudyModal = ({ isOpen, onClose, study, onApply, onCancelApply, onDelete }: StudyModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleOutsideClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    if (!isOpen || !study) return null;

    // 모집 완료된 스터디에는 신청 불가능
    const isApplyDisabled = study.status === StudyStatusType.COMPLETED;

    return (
        <ModalContainer onClick={handleOutsideClick}>
            <ModalWrapper ref={modalRef}>
                <ModalHeader>
                    <ModalTitle>{study.title}</ModalTitle>
                    <ModalCloseButton onClick={onClose}>
                        <MdClose size={20} />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <StudyContent>{study.content}</StudyContent>
                    <MemberList>
                        <MemberListTitle>모집된 회원 ({study.members.length}명)</MemberListTitle>
                        <MemberListItems>
                            {study.members.map(member => (
                                <MemberItem key={member.id}>
                                    {member.name}
                                </MemberItem>
                            ))}
                        </MemberListItems>
                    </MemberList>
                </ModalBody>
                <ModalFooter>
                    {study.participated ? (
                        <ApplyButton
                            onClick={() => onCancelApply(study.id)}
                        >
                            신청 취소
                        </ApplyButton>
                    ) : (
                        <ApplyButton
                            onClick={() => onApply(study.id)}
                            disabled={isApplyDisabled}
                            style={isApplyDisabled ? {
                                opacity: 0.6,
                                cursor: 'not-allowed',
                                backgroundColor: '#E5E7EB',
                                color: '#6B7280'
                            } : undefined}
                        >
                            {isApplyDisabled ? '모집이 완료된 스터디입니다' : '신청하기'}
                        </ApplyButton>
                    )}
                </ModalFooter>
            </ModalWrapper>
        </ModalContainer>
    );
};

export default StudyModal;