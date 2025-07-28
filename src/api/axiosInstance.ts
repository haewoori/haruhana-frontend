import axios from 'axios';
import { clearAuth, setAuth } from "@/store/slices/authSlice";
import { clearSocialLoginState } from "@/utils/auth";
import { store } from "@/store";

// 클라이언트용 공통 axios 인스턴스
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
});

/* 요청 인터셉터 */
api.interceptors.request.use(
    (config) => {
        const accessToken = store.getState().auth.accessToken;

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    error => Promise.reject(error)
);

/* 응답 인터셉터 */
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (token) {
            prom.resolve(token);
        } else {
            prom.reject(error);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response &&
            (error.response.status === 401 || error.response.status === 419) &&
            !originalRequest._retry
        ) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch(err => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/token/reissue-tokens`,
                    {},
                    { withCredentials: true }
                );

                const newAccessToken = res.data.accessToken;
                const prevAuth = store.getState().auth;
                store.dispatch(setAuth({
                    // ...prevAuth.member,
                    accessToken: newAccessToken
                }));

                processQueue(null, newAccessToken);

                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (err) {
                processQueue(err, null);
                clearSocialLoginState();
                store.dispatch(clearAuth());
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;