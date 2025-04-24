import { ChangeEvent, DragEvent, useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UploadResponse } from '@/types/upload';
import { ApiService } from '@/services/api/api-service';

interface FileUploadProps {
  onUploadComplete: (data: UploadResponse) => void;
  isLoading: boolean;
}

const FileUpload = ({ onUploadComplete, isLoading }: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    setError(null);

    if (!file.type.includes('pdf')) {
      setError('Please upload a PDF file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const apiService = ApiService.getInstance();
      const data = await apiService.uploadPdf(file);
      onUploadComplete(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-800 rounded">
          {error}
        </div>
      )}

      <div
        className={`relative border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          id="file-upload"
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleChange}
          disabled={isLoading}
        />

        <Upload size={40} className="text-gray-500 mb-4" />
        <p className="mb-2 text-sm text-gray-600 text-center">
          <span className="font-semibold">Click to upload</span> or drag and
          drop
        </p>
        <p className="text-xs text-gray-500 text-center mb-4">
          PDF files only (Max 10MB)
        </p>

        <label htmlFor="file-upload">
          <Button
            type="button"
            disabled={isLoading}
            className="cursor-pointer"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            {isLoading ? 'Processing...' : 'Select PDF File'}
          </Button>
        </label>
      </div>
    </div>
  );
};

export default FileUpload;
