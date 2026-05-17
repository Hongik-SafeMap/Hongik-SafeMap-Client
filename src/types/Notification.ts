import type { BasePageResponse } from '@/types/Pageable';

// ===================== 알림 =====================
/* [get] /notifications/preferences */
export interface AdminNotification {
  disasterTypeId: number;
  disasterTypeName: string;
  iconUrl: string;
  isEnabled: boolean;
}

/* [put] /notifications/preferences */
export interface AdminNotificationRequset {
  disasterTypeId: number;
  isEnabled: boolean;
}

export interface Notification {
  id: number;
  title: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

/* [get] /notifications */
export interface NotificationResponse extends BasePageResponse {
  notifications: Notification[];
}
