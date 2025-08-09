import styled from "@emotion/styled";
import {Colors} from "../types";

export const HeaderContainer = styled.header<{ colors: Colors }>`
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    padding-top: 1.5rem;
    padding-bottom: 1rem;
    background-color: ${props => props.colors.neutral[50]};
    z-index: 10;
    backdrop-filter: blur(8px);

    &::after {
        content: '';
        position: absolute;
        bottom: -20px;
        left: 0;
        right: 0;
        height: 20px;
        background: linear-gradient(to bottom,
            ${props => props.colors.neutral[50]},
            ${props => `rgba(249, 250, 251, 0.8)`},
            ${props => `rgba(249, 250, 251, 0.4)`},
            ${props => `rgba(249, 250, 251, 0)`}
        );
        pointer-events: none;
    }

    @media (min-width: 1024px) {
        padding-top: 2rem;
    }
`;

export const HeaderContent = styled.div<{ colors: Colors }>`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem 0 0.7rem;
    width: 100%;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        bottom: -0.7rem;
        left: 10%;
        right: 10%;
        background: ${props => props.colors.neutral[200]};
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        opacity: 0.7;
    }
`;

export const DateNavigation = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin: 0 auto;
    width: fit-content;
`;

export const DateText = styled.button<{ colors: Colors }>`
    font-weight: 600;
    color: ${props => props.colors.neutral[700]};
    display: flex;
    align-items: center;
    background: none;
    cursor: pointer;
    transition: color 0.2s;
    
    &:hover {
        color: ${props => props.colors.primary.main};
    }
`;

export const DateButton = styled.button<{ isHovered: boolean; colors: Colors }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.2s;
    color: ${props => props.isHovered ? props.colors.primary.main : props.colors.neutral[400]};
    background-color: ${props => props.isHovered ? props.colors.primary.light : 'transparent'};
`;