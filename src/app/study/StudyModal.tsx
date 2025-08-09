'use client';

import { useRef, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
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
    StudyDescription,
    ApplyButton
} from './page.style';

interface Member {
    id: string;
    name: string;
}

interface StudyModalProps {
    isOpen: boolean;
    onClose: () => void;
    study: {
        id: string;
        title: string;
        description: string;
        members: Member[];
        isApplied: boolean;
    } | null;
    onApply: (studyId: string) => void;
    onCancelApply: (studyId: string) => void;
}

const StudyModal = ({ isOpen, onClose, study, onApply, onCancelApply }: StudyModalProps) => {
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
                    <StudyDescription>{study.description}</StudyDescription>
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
                    {study.isApplied ? (
                        <ApplyButton 
                            isMine={true} 
                            onClick={() => onCancelApply(study.id)}
                        >
                            신청 취소하기
                        </ApplyButton>
                    ) : (
                        <ApplyButton 
                            onClick={() => onApply(study.id)}
                        >
                            신청하기
                        </ApplyButton>
                    )}
                </ModalFooter>
            </ModalWrapper>
        </ModalContainer>
    );
};

export default StudyModal;