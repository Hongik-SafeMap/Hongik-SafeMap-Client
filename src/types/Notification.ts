import type { BasePageResponse } from '@/types/Pageable';

// ===================== 알림 =====================
/* [get] /notifications/preferences */
/* [get] /admin/notifications/preferences */
export interface NotificationPreference {
  disasterTypeId: number;
  disasterTypeName: string;
  iconUrl: string;
  isEnabled: boolean;
}

/* [put] /notifications/preferences */
/* [put] /admin/notifications/preferences */
export interface NotificationPreferenceRequest {
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
