import api from '@/api/axiosInstance';

/**
 * 소셜 인증 관련 API
 */
export const socialAuthClientApi = {
    /**
     * 소셜 로그인 - 카카오
     */
    kakaoLogin: (code: string) => {
        window.location.href = `/api/v1/oauth/kakao?code=${code}`;

        return new Promise<void>((resolve) => {
            // 리다이렉트가 발생하므로 이 Promise는 실제로 resolve되지 않음
            setTimeout(resolve, 100);
        });
    },

    /**
     * 로그아웃
     */
    logout: () =>
        api.post(
            "/api/v1/auth/logout",
            {}
        )
};