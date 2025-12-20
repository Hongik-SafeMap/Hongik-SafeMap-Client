export interface Member {
  id: number;
  name: string;
  email: string;
  reportCount: number;
  accuracy: number;
  isCredible: boolean;
}

export type MembersResponse = Member[];

export interface AdminMyResponse {
  name: string;
  email: string;
}

export interface DashboardResponse {
  totalReports: number;
  credibleUsers: number;
  totalUsers: number;
}
