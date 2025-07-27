export function clearSocialLoginState() {
  // 로컬 스토리지 및 세션 스토리지에서 인증 관련 데이터 제거
  localStorage.removeItem('userInfo');
  sessionStorage.removeItem('kakaoAuthState');

  // 쿠키 제거
  document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}