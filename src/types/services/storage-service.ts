import { HistoryItem } from '@/types/storage';

export interface IStorageService {
  addHistoryItem(item: HistoryItem): Promise<void>;
  getHistoryItems(): Promise<HistoryItem[]>;
}
