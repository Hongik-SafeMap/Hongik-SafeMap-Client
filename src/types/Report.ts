import type { Pageable, Sort } from '@/types/Pageable';

export type DisasterReportStatus =
  | '검토대기'
  | '승인'
  | '블라인드'
  | '허위정보';

export type DisasterType =
  | '화재'
  | '지진'
  | '홍수'
  | '산사태'
  | '태풍'
  | '기타';

export type RiskLevel = '긴급' | '높음' | '보통' | '낮음';

export interface ReportMedia {
  id: string;
  file: File;
  previewUrl: string;
  type: 'image' | 'video' | 'unknown';
}

export interface ReportResponse {
  id: number;
  disasterType: DisasterType;
  riskLevel: RiskLevel;
  disasterDescription: string;
  latitude: number;
  longitude: number;
  address: string;
  mediaUrls: string[];
  status: DisasterReportStatus;
  createdAt: string;
  memberId: number;
}

export interface ReportRequest {
  disasterType: DisasterType;
  riskLevel: RiskLevel;
  disasterDescription: string;
  latitude: number;
  longitude: number;
  address: string;
  mediaUrls: string[];
}

export interface AdminReportContent {
  reportId: number;
  disasterType: DisasterType;
  description: string;
}

export interface AdminReportsResponse {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
  content: AdminReportContent[];
  number: number;
  sort: Sort;
  numberOfElements: number;
  pageable: Pageable;
  empty: boolean;
}

export interface ReportContent {
  id: number;
  disasterType: DisasterType;
  riskLevel: RiskLevel;
  disasterDescription: string;
  address: string;
  status: DisasterReportStatus;
  createdAt: string;
}

export interface ReportsResponse {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
  content: ReportContent[];
  number: number;
  sort: Sort;
  numberOfElements: number;
  pageable: Pageable;
  empty: boolean;
}
