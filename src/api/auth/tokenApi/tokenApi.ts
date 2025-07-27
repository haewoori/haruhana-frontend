import createServerInstance from "@/api/axiosServerInstance";

/**
 * 토큰 관련 API
 * - 서버 컴포넌트용
 */
export const tokenApi = {
    /**
     * 토큰 갱신
     */
    reissueTokens: () => {
        const apiServer = createServerInstance();
        return apiServer.post("/api/v1/auth/token/reissue-tokens");
    }
};