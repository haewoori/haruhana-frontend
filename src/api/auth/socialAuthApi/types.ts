export interface SocialLoginParams {
    code: string;
    provider: string;
}

export interface SocialLoginResponse {
    accessToken: string;
}