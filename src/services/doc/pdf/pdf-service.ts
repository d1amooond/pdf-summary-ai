import { IDocumentService } from '@/types/services';
import { FileProcessingError } from '@/helpers/errors/app-errors';

//@ts-ignore just typescript issue
import pdfParse from 'pdf-parse/lib/pdf-parse';

export class PdfService implements IDocumentService {
  public static Errors = {
    NO_TEXT_CONTENT: 'No text content found in PDF',
    FAILED_TO_EXTRACT_TEXT: 'Failed to extract text from PDF',
  };

  async extractText(file: File): Promise<string> {
    console.log(file);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const data = await pdfParse(buffer);

      if (!data.text || data.text.trim().length === 0) {
        throw new FileProcessingError(PdfService.Errors.NO_TEXT_CONTENT);
      }

      return data.text.trim();
    } catch (error) {
      if (error instanceof FileProcessingError) {
        throw error;
      }
      console.log(error);
      throw new FileProcessingError(PdfService.Errors.FAILED_TO_EXTRACT_TEXT);
    }
  }
}
