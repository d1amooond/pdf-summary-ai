import { File } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface SummaryDisplayProps {
  summary: string;
  filename: string;
  isLoading: boolean;
}

const SummaryDisplay = ({
  summary,
  filename,
  isLoading,
}: SummaryDisplayProps) => {
  return (
    <Card className="mt-8 w-full">
      <CardHeader className="bg-gray-50 border-b">
        <div className="flex items-center">
          <File size={20} className="mr-2 text-blue-600" />
          <CardTitle className="text-lg">{filename}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
            <p className="mt-4 text-gray-600">Generating summary...</p>
          </div>
        ) : (
          <div className="prose max-w-none">
            <h2 className="text-xl font-bold mb-4">Document Summary</h2>
            <div className="whitespace-pre-wrap">{summary}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryDisplay;
