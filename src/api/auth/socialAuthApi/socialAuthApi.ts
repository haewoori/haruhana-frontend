import createServerInstance from '@/api/axiosServerInstance';
import { SocialLoginParams, SocialLoginResponse } from './types';

/**
 * 소셜 인증 관련 API
 */
export const socialAuthApi = {
    /**
     * 소셜 로그인 - 카카오
     */
    kakaoLogin: (code: string) => {
        const apiServer = createServerInstance();
        return apiServer.get<SocialLoginResponse>(
            `/api/v1/oauth/kakao?code=${code}`
        );
    },

    /**
     * 로그아웃
     */
    logout: () => {
        const apiServer = createServerInstance();
        return apiServer.post(
            "/api/v1/auth/logout",
            {}
        );
    }
};