import { Errors } from '@/helpers/enums/errors';

export const ERROR_CODES: Record<Errors, number> = {
  [Errors.VALIDATION_ERROR]: 400,
  [Errors.FILE_PROCESSING_ERROR]: 422,
  [Errors.AI_ERROR]: 500,
  [Errors.STORAGE_ERROR]: 500,
  [Errors.UNKNOWN_ERROR]: 500,
} as const;

export const SUMMARY_ERRORS = {
  MISSING_REQUIRED_FIELDS: 'Missing required fields',
  OPENAI_KEY_EMPTY: 'OpenAI API key not configured',
  FAILED_TO_GENERATE_ERROR: 'Failed to generate summary',
} as const;

export const UPLOAD_ERRORS = {
  NO_FILE_PROVIDED: 'No file provided',
  FILE_MUST_BE_PDF: 'File must be a PDF',
  FILE_SIZE_EXCEEDS: 'File size exceeds limit',
  FAILED_TO_UPLOAD_FILE: 'Failed to upload file',
} as const;
