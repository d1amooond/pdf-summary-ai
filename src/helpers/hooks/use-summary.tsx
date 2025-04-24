import { useState } from 'react';
import { UploadResponse } from '@/types/upload';
import { ApiService } from '@/services/api/api-service';

export const useSummary = () => {
  const [uploadedFile, setUploadedFile] = useState<UploadResponse | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUploadComplete = async (data: UploadResponse) => {
    setUploadedFile(data);
    setIsLoading(true);
    setError(null);

    try {
      const apiService = ApiService.getInstance();
      const summaryData = await apiService.generateSummary(
        data.text,
        data.filename,
      );
      setSummary(summaryData.summary);
      return summaryData;
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setUploadedFile(null);
    setSummary('');
    setIsLoading(false);
    setError(null);
  };

  return {
    uploadedFile,
    summary,
    isLoading,
    error,
    handleUploadComplete,
    reset,
  };
};
