import React from 'react';
import { Colors } from '../Header/Header.style';
import { FloatingButtonContainer } from './FloatingButton.style';

interface FloatingButtonProps {
    onClick: () => void;
    icon: React.ReactNode;
    ariaLabel: string;
    colors: Colors;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ 
    onClick, 
    icon, 
    ariaLabel,
    colors 
}) => {
    return (
        <FloatingButtonContainer
            onClick={onClick}
            aria-label={ariaLabel}
            colors={colors}
        >
            {icon}
        </FloatingButtonContainer>
    );
};

export default FloatingButton;