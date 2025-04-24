import { NextRequest, NextResponse } from 'next/server';
import { PdfService } from '@/services/doc/pdf/pdf-service';
import { handleApiError, ValidationError } from '@/helpers/errors/app-errors';
import { UploadResponse } from '@/types/upload';
import { UPLOAD_ERRORS } from '@/helpers/constants/errors';

export const runtime = 'nodejs';

const pdfService = new PdfService();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      throw new ValidationError(UPLOAD_ERRORS.NO_FILE_PROVIDED);
    }

    if (!file.type.includes('pdf')) {
      throw new ValidationError(UPLOAD_ERRORS.FILE_MUST_BE_PDF);
    }

    const maxSize = parseInt(process.env.MAX_FILE_SIZE || '10485760');
    if (file.size > maxSize) {
      throw new ValidationError(UPLOAD_ERRORS.FILE_SIZE_EXCEEDS);
    }

    const text = await pdfService.extractText(file);

    const response: UploadResponse = {
      text,
      filename: file.name,
    };

    return NextResponse.json(response);
  } catch (error) {
    const errorResponse = handleApiError(error);
    return NextResponse.json(errorResponse, {
      status: errorResponse.statusCode,
    });
  }
}
