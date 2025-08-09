import styled from "@emotion/styled";
import { Colors } from "../Header/Header.style";

export const AnnouncementContainer = styled.div<{ colors: Colors }>`
    background-color: ${props => props.colors.primary.light};
    padding: 0.75rem 1rem;
    border-radius: 0 1rem 1rem 1rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    position: relative;
    border: 1px solid ${props => `rgba(59, 130, 246, 0.1)`};
`;

export const AnnouncementIcon = styled.div<{ colors: Colors }>`
    margin-right: 0.5rem;
    color: ${props => props.colors.primary.main};
    display: flex;
    align-items: center;
`;

export const AnnouncementText = styled.p<{ colors: Colors }>`
    font-size: 0.875rem;
    color: ${props => props.colors.neutral[600]};
    line-height: 1.4;
`;