import { IApiService } from '@/types/services/api-service';
import { UploadResponse } from '@/types/upload';
import { SummaryResponse } from '@/types/summary';
import { ValidationError } from '@/helpers/errors/app-errors';
import { SUMMARY_ERRORS } from '@/helpers/constants/errors';
import { UPLOAD_ERRORS } from '@/helpers/constants/errors';

export class ApiService implements IApiService {
  private static instance: ApiService | null = null;
  private readonly baseUrl: string;

  private constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  public static getInstance(baseUrl: string = ''): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService(baseUrl);
    }
    return ApiService.instance;
  }

  public static resetInstance(): void {
    ApiService.instance = null;
  }

  async uploadPdf(file: File): Promise<UploadResponse> {
    if (!file) {
      throw new ValidationError(UPLOAD_ERRORS.NO_FILE_PROVIDED);
    }

    if (!file.type.includes('pdf')) {
      throw new ValidationError(UPLOAD_ERRORS.FILE_MUST_BE_PDF);
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.baseUrl}/api/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || UPLOAD_ERRORS.FAILED_TO_UPLOAD_FILE);
    }

    return await response.json();
  }

  async generateSummary(
    text: string,
    filename: string,
  ): Promise<SummaryResponse> {
    if (!text || !filename) {
      throw new ValidationError(SUMMARY_ERRORS.MISSING_REQUIRED_FIELDS);
    }

    const response = await fetch(`${this.baseUrl}/api/summary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        filename,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to generate summary');
    }

    return await response.json();
  }
}
