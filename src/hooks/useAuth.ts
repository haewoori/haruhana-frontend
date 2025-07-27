import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { clearAuth, setAuth } from '@/store/slices/authSlice';
import { socialAuthClientApi } from '@/api/auth/socialAuthApi';
import { tokenClientApi } from '@/api/auth/tokenApi/tokenClientApi';
import { clearSocialLoginState } from '@/utils/auth';

interface RefreshOptions {
  onSuccess?: () => void;
  onError?: (error: any) => void;
  redirectPath?: string;
}

export function useAuth() {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state: any) => state.auth);

  /**
   * 로그아웃
   */
  const logout = async () => {
    try {
      await socialAuthClientApi.logout();
    } catch (error) {
      console.error('로그아웃 실패');
    } finally {
      clearSocialLoginState();
      dispatch(clearAuth());
      router.push('/');
    }
  };

  /**
   * 토큰 갱신
   * @param options - 토큰 갱신 옵션 (성공/실패 콜백, 리디렉션 경로)
   * @returns 성공 여부
   */
  const refreshTokens = async (options?: RefreshOptions) => {
    try {
      const response = await tokenClientApi.reissueTokens();
      if (response.status === 200) {
        const { accessToken } = response.data;

        dispatch(setAuth({
          accessToken,
        }));

        if (options?.onSuccess) {
          options.onSuccess();
        } else if (options?.redirectPath) {
          router.replace(options.redirectPath);
        } else {
          router.replace('/feed');
        }

        return true;
      }
      return false;
    } catch (error) {
      console.error('토큰 갱신 실패:', error);

      if (options?.onError) {
        options.onError(error);
      }

      return false;
    }
  };

  return {
    logout,
    refreshTokens,
    isAuthenticated: !!auth.accessToken,
    user: auth
  };
}