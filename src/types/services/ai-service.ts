export interface IAIService {
  generateSummary(text: string): Promise<string>;
}
