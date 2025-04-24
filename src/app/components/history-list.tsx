import { Clock, File } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { HistoryItem } from '@/types/storage';

interface HistoryListProps {
  items: HistoryItem[];
}

const HistoryList = ({ items }: HistoryListProps) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <Card className="mt-8 w-full">
      <CardHeader className="bg-gray-50 border-b">
        <div className="flex items-center">
          <Clock size={20} className="mr-2 text-gray-600" />
          <CardTitle className="text-lg">Recent Documents</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <ul className="divide-y">
          {items.map((item) => (
            <li key={item.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-start mb-2">
                <File size={16} className="mr-2 mt-1 text-blue-600" />
                <div>
                  <h3 className="font-medium">{item.filename}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="pl-6 text-gray-700 text-sm">
                <p className="line-clamp-3">{item.summary}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default HistoryList;
