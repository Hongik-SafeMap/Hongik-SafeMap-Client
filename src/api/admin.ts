import { axiosInstance } from './axiosInstance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
  AdminMyResponse,
  DashboardResponse,
  MembersResponse,
} from '@/types/Admin';
import type { PageableRequest } from '@/types/Pageable';
import type { AdminReportsResponse } from '@/types/Report';

// 대시보드
export const useAdminGetDashboard = () => {
  return useQuery<DashboardResponse>({
    queryKey: ['adminDashboard'],
    queryFn: async () => {
      const response = await axiosInstance.get('/admin/dashboard');
      return response.data;
    },
  });
};

// 제보 관리
export const useAdminGetReports = (pageable: PageableRequest) => {
  return useQuery<AdminReportsResponse>({
    queryKey: ['adminReports', pageable],
    queryFn: async () => {
      const response = await axiosInstance.get('/admin/reports', {
        params: pageable,
      });
      return response.data;
    },
  });
};

// 사용자 관리
export const useAdminGetMembers = () => {
  return useQuery<MembersResponse>({
    queryKey: ['adminMembers'],
    queryFn: async () => {
      const response = await axiosInstance.get('/admin/members');
      return response.data;
    },
  });
};

// 사용자 공신력 관리
export const useAdminPatchMemberCredible = (memberId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.patch(
        `/admin/members/${memberId}/credible`,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminMembers'] });
    },
    onError: (error) => {
      console.error('useAdminPatchMemberCredible 실패', error);
    },
  });
};

// 계정
export const useAdminGetMy = () => {
  return useQuery<AdminMyResponse>({
    queryKey: ['adminMy'],
    queryFn: async () => {
      const response = await axiosInstance.get('/admin/me');
      return response.data;
    },
  });
};
