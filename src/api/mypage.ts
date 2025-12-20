import { axiosInstance } from './axiosInstance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
  EmergencyContactsRequest,
  EmergencyContact,
  MyResponse,
  PasswordRequest,
  SensitiveInfoRequest,
  SensitiveInfoResponse,
  EmergencyContactsResponse,
} from '@/types/Mypage';
import type { ReportsResponse } from '@/types/Report';
import type { PageableRequest } from '@/types/Pageable';

// 마이페이지 정보 조회
export const useGetMy = () => {
  return useQuery<MyResponse>({
    queryKey: ['my'],
    queryFn: async () => {
      const response = await axiosInstance.get('/members/me');
      return response.data;
    },
  });
};

// 비밀번호 변경
export const usePatchPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: PasswordRequest) => {
      const response = await axiosInstance.patch(
        '/members/me/password',
        payload,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my'] });
    },
    onError: (error) => {
      console.error('usePatchPassword 실패', error);
    },
  });
};

// 민감정보 조회
export const useGetSensitiveInfo = () => {
  return useQuery<SensitiveInfoResponse>({
    queryKey: ['sensitiveInfo'],
    queryFn: async () => {
      const response = await axiosInstance.get('/members/me/sensitive-info');
      return response.data;
    },
  });
};

// 민감정보 수정
export const usePutSensitiveInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SensitiveInfoRequest) => {
      const response = await axiosInstance.put<SensitiveInfoResponse>(
        '/members/me/sensitive-info',
        payload,
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log('usePutSensitiveInfo 성공:', data);
      queryClient.invalidateQueries({
        queryKey: ['sensitiveInfo'],
      });
    },
    onError: (error) => {
      console.error('usePutSensitiveInfo 실패:', error);
    },
  });
};

// 비상연락처 수정
export const usePutEmergencyContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      emergencyContactId,
      payload,
    }: {
      emergencyContactId: number;
      payload: EmergencyContactsRequest;
    }) => {
      const response = await axiosInstance.put<EmergencyContact>(
        `/members/me/emergency-contacts/${emergencyContactId}`,
        payload,
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log('usePutEmergencyContract 성공:', data);
      queryClient.invalidateQueries({
        queryKey: ['emergencyContact'],
      });
    },
    onError: (error) => {
      console.error('usePutEmergencyContract 실패:', error);
    },
  });
};

// 비상연락처 삭제
export const useDeleteEmergencyContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (emergencyContactId: number) => {
      const response = await axiosInstance.delete(
        `/members/me/emergency-contacts/${emergencyContactId}`,
      );
      return response;
    },
    onSuccess: (response) => {
      console.log('useDeleteEmergencyContact 성공:', response.data);
      queryClient.invalidateQueries({
        queryKey: ['emergencyContact'],
      });
    },
    onError: (error) => {
      console.error('useDeleteEmergencyContact 실패:', error);
    },
  });
};

// 비상연락처 조회
export const useGetEmergencyContact = () => {
  return useQuery<EmergencyContactsResponse>({
    queryKey: ['emergencyContact'],
    queryFn: async () => {
      const response = await axiosInstance.get(
        '/members/me/emergency-contacts',
      );
      return response.data;
    },
  });
};

// 비상연락처 등록
export const usePostEmergencyContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: EmergencyContactsRequest) => {
      const response = await axiosInstance.post(
        '/members/me/emergency-contacts',
        payload,
      );
      return response;
    },
    onSuccess: (response) => {
      console.log('usePutEmergencyContract 성공:', response.data);
      queryClient.invalidateQueries({
        queryKey: ['emergencyContact'],
      });
    },
    onError: (error) => {
      console.error('usePutEmergencyContract 실패:', error);
    },
  });
};

// 내 제보 조회
export const useGetMyReports = (pageable: PageableRequest) => {
  return useQuery<ReportsResponse>({
    queryKey: ['myReports', pageable],
    queryFn: async () => {
      const response = await axiosInstance.get('/members/me/reports', {
        params: pageable,
      });
      return response.data;
    },
  });
};
