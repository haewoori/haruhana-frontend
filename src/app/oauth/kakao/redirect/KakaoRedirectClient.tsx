'use client';

import { useSocialLogin } from '@/hooks/useSocialLogin';
import { Provider } from '@/types/auth/provider';
import {
    Container,
    SpinnerContainer,
    Spinner,
    ErrorContainer
} from './KakaoRedirectClient.style';

export default function KakaoRedirectClient() {
    const { isLoading, error } = useSocialLogin({
        provider: 'KAKAO' as Provider,
        sessionKey: 'kakao-login-requested'
    });

    if (error) {
        return (
            <Container>
                <ErrorContainer>
                    <h2>로그인 오류</h2>
                    <p>{error}</p>
                    <p>메인 페이지로 이동합니다...</p>
                </ErrorContainer>
            </Container>
        );
    }

    return (
        <Container>
            <SpinnerContainer>
                <Spinner />
            </SpinnerContainer>
        </Container>
    );
}