import { NextRequest, NextResponse } from 'next/server';
import { OpenAIService } from '@/services/ai/openai/openai-service';
import { handleApiError, ValidationError } from '@/helpers/errors/app-errors';
import { SummaryResponse } from '@/types/summary';
import { SUMMARY_ERRORS } from '@/helpers/constants/errors';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { text, filename } = await request.json();

    if (!text || !filename) {
      throw new ValidationError(SUMMARY_ERRORS.MISSING_REQUIRED_FIELDS);
    }

    if (!process.env.OPENAI_API_KEY) {
      throw new Error(SUMMARY_ERRORS.OPENAI_KEY_EMPTY);
    }

    const openAIService = new OpenAIService(process.env.OPENAI_API_KEY);
    const summary = await openAIService.generateSummary(text);

    const response: SummaryResponse = {
      summary,
      filename,
    };

    return NextResponse.json(response);
  } catch (error) {
    const errorResponse = handleApiError(error);
    return NextResponse.json(errorResponse, {
      status: errorResponse.statusCode,
    });
  }
}
