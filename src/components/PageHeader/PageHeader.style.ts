import styled from "@emotion/styled";
import { Colors } from "../Header/Header.style";

export const HeaderContainer = styled.div`
    margin-bottom: 1.5rem;
`;

export const GroupTitle = styled.h1<{ colors: Colors }>`
    font-size: 1.5rem;
    font-weight: 700;
    color: ${props => props.colors.neutral[800]};
    margin-bottom: 0.25rem;
`;

export const GradientText = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(to right, #86dbf8, #005ac1);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
`;