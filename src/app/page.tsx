'use client';

import {
    LogoContainer,
    Accent,
    CharacterWithAccent,
    Container,
    ContentWrapper,
    MainContent,
    Heading,
    VerticalLine,
    LogoText,
    Footer,
    KakaoButton,
    ButtonContent,
    KakaoIcon
} from "./page.style";

export default function Home() {
    const handleLoginClick = () => {
        window.location.href = '/login';
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
                    <KakaoButton onClick={handleLoginClick}>
                        <ButtonContent>
                            <KakaoIcon src="/icons/kakao_black.png" alt="Kakao Icon" />
                            <span>카카오로 3초 만에 시작하기</span>
                        </ButtonContent>
                    </KakaoButton>
                </Footer>
            </ContentWrapper>
        </Container>
    );
}