import { IAIService } from '@/types/services';
import { AIError } from '@/helpers/errors/app-errors';
import OpenAI from 'openai';

export class OpenAIService implements IAIService {
  public static readonly Errors = {
    NO_SUMMARY_GENERATED: 'No summary generated',
    FAILED_TO_GENERATE_SUMMARY: 'Failed to generate summary',
  };

  private readonly openAIModel = 'gpt-3.5-turbo';

  private readonly systemPrompt =
    'You are a helpful assistant that creates concise summaries of documents. Provide a clear and comprehensive summary that captures the main points and important details.';
  private readonly userPrompt = 'Please summarize the following text:';

  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey,
    });
  }

  private generateSummaryPrompt(text: string) {
    return `${this.userPrompt}\n\n${text}`;
  }

  async generateSummary(text: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: this.openAIModel,
        messages: [
          {
            role: 'system',
            content: this.systemPrompt,
          },
          {
            role: 'user',
            content: this.generateSummaryPrompt(text),
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      if (!response.choices[0]?.message?.content) {
        throw new AIError(OpenAIService.Errors.NO_SUMMARY_GENERATED);
      }

      return response.choices[0].message.content.trim();
    } catch (error) {
      if (error instanceof AIError) {
        throw error;
      }
      console.log(error);
      throw new AIError(OpenAIService.Errors.FAILED_TO_GENERATE_SUMMARY);
    }
  }
}
