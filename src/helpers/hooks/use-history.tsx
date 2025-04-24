import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SummaryResponse } from '@/types/summary';
import { HistoryItem } from '@/types/storage';
import { LocalStorageService } from '@/services/storage/local-storage/local-storage-service';

export const useHistory = () => {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const storageService = new LocalStorageService();

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const historyItems = await storageService.getHistoryItems();
        setItems(historyItems);
      } catch (error) {
        console.error('Failed to load history items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, []);

  const addItem = async (data: SummaryResponse) => {
    try {
      const newItem: HistoryItem = {
        id: uuidv4(),
        filename: data.filename,
        summary: data.summary,
        timestamp: new Date(),
      };

      await storageService.addHistoryItem(newItem);
      setItems((prev) => [newItem, ...prev].slice(0, 5));

      return newItem;
    } catch (error) {
      console.error('Failed to add history item:', error);
      throw error;
    }
  };

  return {
    items,
    isLoading,
    addItem,
  };
};
