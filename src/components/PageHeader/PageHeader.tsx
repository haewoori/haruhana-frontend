import React from 'react';
import { Colors } from '../Header/Header.style';
import {
    HeaderContainer,
    GroupTitle,
    GradientText
} from './PageHeader.style';

interface PageHeaderProps {
    groupTitle: string;
    gradientText: string;
    colors: Colors;
}

const PageHeader: React.FC<PageHeaderProps> = ({ groupTitle, gradientText, colors }) => {
    return (
        <HeaderContainer>
            <GroupTitle colors={colors}>{groupTitle}</GroupTitle>
            <GradientText>{gradientText}</GradientText>
        </HeaderContainer>
    );
};

export default PageHeader;