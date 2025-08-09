import styled from "@emotion/styled";
import { Colors } from "../Header/Header.style";

export const FloatingButtonContainer = styled.button<{ colors: Colors }>`
    background: ${props => props.colors.primary.gradient};
    color: white;
    width: 4rem;
    height: 4rem;
    border-radius: 9999px;
    box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3), 0 4px 6px -2px rgba(59, 130, 246, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 6rem;
    right: 1.5rem;
    transition: all 0.2s;

    &:hover {
        transform: translateY(-2px) scale(1.05);
        box-shadow: 0 15px 20px -3px rgba(59, 130, 246, 0.4), 0 6px 8px -2px rgba(59, 130, 246, 0.3);
    }

    &:active {
        transform: translateY(0) scale(0.98);
    }
`;