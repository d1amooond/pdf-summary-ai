'use client';

import { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';
import FileUpload from '@/app/components/file-upload';
import SummaryDisplay from '@/app/components/summary-display';
import HistoryList from '@/app/components/history-list';
import { Button } from '@/components/ui/button';
import { useSummary } from '@/helpers/hooks/use-summary';
import { useHistory } from '@/helpers/hooks/use-history';
import { ApiService } from '@/services/api/api-service';

const Home = () => {
  const {
    uploadedFile,
    summary,
    isLoading,
    error,
    handleUploadComplete,
    reset,
  } = useSummary();
  const { items, addItem } = useHistory();
  const [showUpload, setShowUpload] = useState(true);

  useEffect(() => {
    ApiService.getInstance();
  }, []);

  const handleUpload = async (data: any) => {
    try {
      const summaryData = await handleUploadComplete(data);
      setShowUpload(false);
      await addItem(summaryData);
    } catch (error) {
      console.error('Error processing document:', error);
    }
  };

  const handleNewDocument = () => {
    reset();
    setShowUpload(true);
  };

  return (
    <main className="container mx-auto py-8 px-4 max-w-4xl">
      <header className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <FileText size={36} className="text-blue-600 mr-2" />
          <h1 className="text-3xl font-bold">PDF Summary Generator (AI)</h1>
        </div>
        <p className="text-gray-600">
          Upload a PDF document and get an AI-generated summary in seconds
        </p>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-300 text-red-800 rounded">
          Error: {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        {showUpload ? (
          <FileUpload onUploadComplete={handleUpload} isLoading={isLoading} />
        ) : (
          <>
            <SummaryDisplay
              filename={uploadedFile?.filename || ''}
              summary={summary}
              isLoading={isLoading}
            />
            <div className="mt-6 flex justify-center">
              <Button onClick={handleNewDocument} className="cursor-pointer">
                Process Another Document
              </Button>
            </div>
          </>
        )}
      </div>

      <HistoryList items={items} />

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>&copy; Made by Dmytro Prokopenko</p>
      </footer>
    </main>
  );
};

export default Home;
