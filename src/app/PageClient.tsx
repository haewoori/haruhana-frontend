'use client';

import {useEffect, useState} from 'react';
import {
    Accent,
    ButtonContent,
    CharacterWithAccent,
    Container,
    ContentWrapper,
    Footer,
    Heading,
    KakaoButton,
    KakaoIcon,
    LogoContainer,
    LogoText,
    MainContent,
    VerticalLine
} from "@/app/page.style";
import {socialProviders} from '@/providers/socialProviders';
import {useRouter} from "next/navigation";
import {useSelector} from "react-redux";

export default function PageClient() {
    const router = useRouter();
    const { accessToken, isAuthenticated } = useSelector((state: any) => state.auth);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (accessToken) {
            router.push('/feed');
        }
    }, [isAuthenticated, accessToken, router]);

    const handleKakaoLogin = () => {
        setIsLoading(true);
        const kakaoProvider = socialProviders.find(provider => provider.name === 'KAKAO');

        if (kakaoProvider) {
            window.location.href = kakaoProvider.getAuthUrl();
        } else {
            console.error('카카오 로그인 제공자를 찾을 수 없습니다.');
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <ContentWrapper>
                <MainContent>
                    <Heading>
                        처음이라 뜨겁게,<br/>
                        우리라서 강하게
                    </Heading>
                    <VerticalLine />
                    <LogoContainer style={{ marginTop: '2rem' }}>
                        <LogoText>
                            하루
                            <CharacterWithAccent>
                                하
                                <Accent/>
                            </CharacterWithAccent>
                            <CharacterWithAccent>
                                나
                                <Accent/>
                            </CharacterWithAccent>
                        </LogoText>
                    </LogoContainer>
                </MainContent>

                <Footer>
                    <KakaoButton
                        onClick={handleKakaoLogin}
                        disabled={isLoading}
                    >
                        <ButtonContent>
                            <KakaoIcon src="/icons/kakao_black.png" alt="Kakao Icon" />
                            <span>{isLoading ? '로그인 중...' : '카카오로 3초 만에 시작하기'}</span>
                        </ButtonContent>
                    </KakaoButton>
                </Footer>
            </ContentWrapper>
        </Container>
    );
}