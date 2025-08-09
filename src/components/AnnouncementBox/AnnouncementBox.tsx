import React from 'react';
import { MdCampaign } from 'react-icons/md';
import { Colors } from '../Header/Header.style';
import {
    AnnouncementContainer,
    AnnouncementIcon,
    AnnouncementText
} from './AnnouncementBox.style';

interface AnnouncementBoxProps {
    message: string;
    colors: Colors;
}

const AnnouncementBox: React.FC<AnnouncementBoxProps> = ({ message, colors }) => {
    return (
        <AnnouncementContainer colors={colors}>
            <AnnouncementIcon colors={colors}>
                <MdCampaign size={20} />
            </AnnouncementIcon>
            <AnnouncementText colors={colors}>{message}</AnnouncementText>
        </AnnouncementContainer>
    );
};

export default AnnouncementBox;