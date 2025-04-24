import { IStorageService } from '@/types/services';
import { HistoryItem } from '@/types/storage';
import { StorageError } from '@/helpers/errors/app-errors';

export class LocalStorageService implements IStorageService {
  public static readonly Errors = {
    FAILED_TO_SAVE: 'Failed to save history item',
    FAILED_TO_RETRIEVE: 'Failed to retrieve history item',
  };

  private readonly storageKey = 'pdf_summary_history';
  private readonly maxItems = parseInt(process.env.MAX_HISTORY_ITEMS || '5');

  async addHistoryItem(item: HistoryItem): Promise<void> {
    try {
      if (typeof window === 'undefined') {
        return;
      }

      const items = await this.getHistoryItems();
      items.unshift(item);

      const trimmedItems = items.slice(0, this.maxItems);

      localStorage.setItem(this.storageKey, JSON.stringify(trimmedItems));
    } catch (error) {
      throw new StorageError(LocalStorageService.Errors.FAILED_TO_SAVE);
    }
  }

  async getHistoryItems(): Promise<HistoryItem[]> {
    try {
      if (typeof window === 'undefined') {
        return [];
      }

      const data = localStorage.getItem(this.storageKey);
      if (!data) {
        return [];
      }

      const items = JSON.parse(data) as HistoryItem[];
      return items.map((item) => ({
        ...item,
        timestamp: new Date(item.timestamp),
      }));
    } catch (error) {
      throw new StorageError(LocalStorageService.Errors.FAILED_TO_RETRIEVE);
    }
  }
}
