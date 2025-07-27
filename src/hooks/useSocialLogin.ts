'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/store/slices/authSlice';
import { socialAuthClientApi } from '@/api/auth/socialAuthApi';
import { Provider } from '@/types/auth/provider';
import { clearSocialLoginState } from "@/utils/auth";

interface UseSocialLoginOptions {
  provider: Provider;
  sessionKey: string;
}

export function useSocialLogin({ provider, sessionKey }: UseSocialLoginOptions) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleSocialLogin = async () => {
      const code = searchParams.get('code');
      const errorParam = searchParams.get('error');
      const token = searchParams.get('token');

      if (token) {
        dispatch(setAuth({
          accessToken: token,
        }));

        router.replace('/feed');
        setIsLoading(false);
        return;
      }

      if (errorParam) {
        setError(`${provider} 로그인 오류: ${errorParam}`);
        setIsLoading(false);
        return;
      }

      if (!code) {
        setError('인증 정보가 올바르지 않습니다.');
        setIsLoading(false);
        return;
      }

      // 중복 요청 방지
      const requestKey = `${sessionKey}-${code}`;
      const storedTimestamp = sessionStorage.getItem(requestKey);
      const currentTime = Date.now();

      if (storedTimestamp && (currentTime - parseInt(storedTimestamp)) < 20000) {
        console.warn(`${provider} 로그인 요청이 이미 처리 중입니다.`);
        return;
      }

      sessionStorage.setItem(requestKey, currentTime.toString());

      try {
        if (provider === 'KAKAO') {
          await socialAuthClientApi.kakaoLogin(code);
        } else {
          throw new Error(`지원하지 않는 소셜 로그인 제공자: ${provider}`);
        }
      } catch (error) {
        sessionStorage.removeItem(requestKey);

        console.error(`${provider} 로그인 실패:`, error);
        setError('로그인 처리 중 오류가 발생했습니다.');
        setIsLoading(false);

        clearSocialLoginState();
        setTimeout(() => {
          router.replace('/');
        }, 3000);
      }
    };

    handleSocialLogin();
  }, [searchParams, dispatch, router, provider, sessionKey]);

  return { isLoading, error };
}