import styled from '@emotion/styled';
import { colors, getCardAccentColor } from '@/app/feed/page.style';

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(2px);
    animation: fadeIn 0.2s ease-in-out;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

export const ModalContainer = styled.div`
    background-color: white;
    border-radius: 1rem;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    overflow: hidden;
    animation: slideUp 0.3s ease-out;

    @keyframes slideUp {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;

export const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid ${colors.neutral[200]};
`;

export const ModalTitle = styled.h3`
    font-size: 1.25rem;
    font-weight: 600;
    color: ${colors.neutral[800]};
    margin: 0;
`;

export const CloseButton = styled.button`
    background: none;
    border: none;
    color: ${colors.neutral[500]};
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;

    &:hover {
        background-color: ${colors.neutral[100]};
        color: ${colors.neutral[700]};
    }
`;

export const ModalContent = styled.div`
    padding: 1.5rem;
`;

export const TextArea = styled.textarea`
    width: 100%;
    min-height: 150px;
    padding: 1rem;
    border: 1px solid ${colors.neutral[300]};
    border-radius: 0.5rem;
    resize: none;
    font-size: 1rem;
    font-family: inherit;
    margin-bottom: 1rem;
    transition: border-color 0.2s;

    &:focus {
        outline: none;
        border-color: ${colors.primary.main};
        box-shadow: 0 0 0 2px ${colors.primary.light};
    }

    &::placeholder {
        color: ${colors.neutral[400]};
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 1.5rem;
`;

export const CancelButton = styled.button`
    padding: 0.625rem 1.25rem;
    border-radius: 0.5rem;
    font-weight: 500;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
    background-color: ${colors.neutral[100]};
    color: ${colors.neutral[700]};
    border: 1px solid ${colors.neutral[200]};

    &:hover {
        background-color: ${colors.neutral[200]};
    }
`;

export const SaveButton = styled.button<{ color: string; disabled?: boolean }>`
    padding: 0.625rem 1.25rem;
    border-radius: 0.5rem;
    font-weight: 500;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
    background: ${props => props.disabled
            ? colors.neutral[300]
            : colors.primary.main};
    color: white;
    border: none;
    opacity: ${props => props.disabled ? 0.7 : 1};
    pointer-events: ${props => props.disabled ? 'none' : 'auto'};

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    &:active {
        transform: translateY(0);
    }
`;

export const ColorOptions = styled.div`
    display: flex;
    gap: 0.75rem;
    margin-top: 1rem;
`;

export const ColorOption = styled.button<{ color: string; isSelected: boolean }>`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: ${props => props.color};
    cursor: pointer;
    transition: all 0.2s;
    border: ${props => props.isSelected
            ? `2px solid ${colors.neutral[800]}`
            : `2px solid ${colors.neutral[200]}`};
    box-shadow: ${props => props.isSelected
            ? '0 0 0 2px white, 0 0 0 4px ' + props.color
            : 'none'};

    &:hover {
        transform: scale(1.1);
    }
`;