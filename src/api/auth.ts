import { axiosInstance } from './axiosInstance';
import { useMutation } from '@tanstack/react-query';
import type {
  SignupResponse,
  GeneralLoginRequest,
  SignupRequest,
  LoginResponse,
  SNSLoginRequest,
} from '@/types/Auth';

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: async (payload: SignupRequest) => {
      const response = await axiosInstance.post<SignupResponse>(
        '/signup',
        payload,
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log('useSignupMutation 성공', data);
    },
    onError: (error) => {
      console.error('useSignupMutation 실패:', error);
    },
  });
};

export const useSNSLoginMutation = () => {
  return useMutation({
    mutationFn: async (payload: SNSLoginRequest) => {
      const response = await axiosInstance.post<LoginResponse>(
        '/auth/login/sns',
        payload,
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log('useSNSLoginMutation 성공', data);
    },
    onError: (error) => {
      console.error('useSNSLoginMutation 실패:', error);
    },
  });
};

export const useGeneralLoginMutation = () => {
  return useMutation({
    mutationFn: async (payload: GeneralLoginRequest) => {
      const response = await axiosInstance.post<LoginResponse>(
        '/auth/login/general',
        payload,
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log('useGeneralLoginMutation 성공', data);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    },
    onError: (error) => {
      console.error('useGeneralLoginMutation 실패:', error);
    },
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post('/auth/logout');
      return response;
    },
    onSuccess: (response) => {
      console.log('useLogoutMutation 성공', response.data);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/';
    },
    onError: (error) => {
      console.error('useLogoutMutation 실패:', error);
    },
  });
};
