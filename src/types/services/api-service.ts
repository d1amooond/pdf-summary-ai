import { SummaryResponse } from '@/types/summary';
import { UploadResponse } from '@/types/upload';

export interface IApiService {
  uploadPdf(file: File): Promise<UploadResponse>;
  generateSummary(text: string, filename: string): Promise<SummaryResponse>;
}
