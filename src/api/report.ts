import { axiosInstance } from './axiosInstance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
  ReportRequest,
  ReportResponse,
  ReportsResponse,
} from '@/types/Report';
import type { PageableRequest } from '@/types/Pageable';

// 제보 리스트 조회
export const useGetReports = (pageable: PageableRequest) => {
  return useQuery<ReportsResponse>({
    queryKey: ['reports', pageable],
    queryFn: async () => {
      const response = await axiosInstance.get('/disaster-reports', {
        params: pageable,
      });
      return response.data;
    },
  });
};

// 제보 등록
export const usePostReports = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ReportRequest) => {
      const response = await axiosInstance.post('/disaster-reports', payload);
      return response;
    },
    onSuccess: (response) => {
      console.log('usePostReports 성공:', response.data);
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
    onError: (error) => {
      console.error('usePostReports 실패:', error);
    },
  });
};

// 제보 단건 조회
export const useGetReport = (reportId: number) => {
  return useQuery<ReportResponse>({
    queryKey: ['report', reportId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/disaster-reports/${reportId}`);
      return response.data;
    },
  });
};
