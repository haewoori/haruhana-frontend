import { Provider } from '@/types/auth/provider';

interface SocialProvider {
    name: Provider;
    label: string;
    getAuthUrl: () => string;
}

/**
 * 소셜 로그인 제공자
 * - 카카오
 */
export const socialProviders: SocialProvider[] = [
    {
        name: 'KAKAO',
        label: '카카오 로그인',
        getAuthUrl: () => {
            const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || '';
            const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI || '');
            return `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
        },
    },
];