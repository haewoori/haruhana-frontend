import api from "@/api/axiosInstance";

/**
 * 토큰 관련 API
 * - 클라이언트 컴포넌트용
 */
export const tokenClientApi = {
    /**
     * 토큰 갱신
     */
    reissueTokens: () =>
        api.post("/api/v1/auth/token/reissue-tokens")
};