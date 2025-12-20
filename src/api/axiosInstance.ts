import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';
import type { LoginResponse } from '@/types/Auth';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{
  config: AxiosRequestConfig;
  resolve: (value: AxiosResponse<any>) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null,
) => {
  failedQueue.forEach(async (prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      (prom.config.headers as any)['Authorization'] = `Bearer ${token}`;
      try {
        const response = await axiosInstance(prom.config);
        prom.resolve(response);
      } catch (err) {
        prom.reject(err);
      }
    }
  });
  failedQueue = [];
};

// accessToken 추가
axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// refreshToken 추가
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !(originalRequest as any)._retry
    ) {
      if (isRefreshing) {
        return new Promise<AxiosResponse<any>>((resolve, reject) => {
          failedQueue.push({ config: originalRequest, resolve, reject });
        });
      }

      (originalRequest as any)._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
          throw new Error('Refresh token not found. Please log in again.');
        }

        const reissueResponse = await axios.post<LoginResponse>(
          `${axiosInstance.defaults.baseURL}/auth/reissue`,
          refreshToken ? { refreshToken: refreshToken } : {},
        );

        const newAccessToken = reissueResponse.data.accessToken;
        const newRefreshToken = reissueResponse.data.refreshToken;

        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        processQueue(null, newAccessToken);

        (originalRequest.headers as any)['Authorization'] =
          `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError: any) {
        console.error('Refresh Token 재발급 실패 또는 만료:', refreshError);
        processQueue(refreshError);

        localStorage.clear();
        window.location.href = '/login';

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
