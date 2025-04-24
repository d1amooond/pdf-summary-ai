export interface IDocumentService {
  extractText(file: File): Promise<string>;
}
