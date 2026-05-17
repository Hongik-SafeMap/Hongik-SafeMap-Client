import { axiosInstance } from '@/api/axiosInstance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
  AdminNotification,
  AdminNotificationRequset,
  NotificationResponse,
} from '@/types/Notification';

// ===================== 알림 - 관리자 시스템 알림 설정 =====================
/* 알림 설정 조회 */
export const useNotificationPreference = () => {
  return useQuery<AdminNotification[]>({
    queryKey: ['admin', 'notifications', 'preferences'],
    queryFn: async () => {
      const response = await axiosInstance.get(
        '/admin/notifications/preferences',
      );
      return response.data;
    },
  });
};

/* 알림 설정 변경 */
export const useUpdateNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: AdminNotificationRequset) => {
      const response = await axiosInstance.patch(
        `/admin/notifications/preferences`,
        request,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin', 'notifications', 'preferences'],
      });
    },
  });
};

// ===================== 알림 - 사용자 알림 화면 =====================
/* 알림 목록 조회 */
export const useNotification = () => {
  return useQuery<NotificationResponse>({
    queryKey: ['notifications', 'list'],
    queryFn: async () => {
      const response = await axiosInstance.get('/notifications');
      return response.data;
    },
  });
};

/* 읽지 않은 알림 개수 조회 */
export const useNotificationUnread = () => {
  return useQuery({
    queryKey: ['notifications', 'unread'],
    queryFn: async () => {
      const response = await axiosInstance.get('/notifications/unread-count');
      return response.data;
    },
  });
};

/* 알림 읽음 처리 */
export const useUpdateNotificationRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.patch('/notifications/read');
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
