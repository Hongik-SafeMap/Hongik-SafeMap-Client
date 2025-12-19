export interface ReportMedia {
  id: string;
  file: File;
  previewUrl: string;
  type: 'image' | 'video' | 'unknown';
}
