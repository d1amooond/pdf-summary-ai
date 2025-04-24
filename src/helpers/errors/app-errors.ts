import { Errors } from '@/helpers/enums/errors';
import { ERROR_CODES } from '@/helpers/constants/errors';

export class AppErrors extends Error {
  constructor(
    public message: string,
    public code: string,
    public statusCode: number = 500,
  ) {
    super(message);
    this.name = 'AppErrors';
  }
}

export class ValidationError extends AppErrors {
  constructor(message: string) {
    super(
      message,
      Errors.VALIDATION_ERROR,
      ERROR_CODES[Errors.VALIDATION_ERROR],
    );
  }
}

export class FileProcessingError extends AppErrors {
  constructor(message: string) {
    super(
      message,
      Errors.FILE_PROCESSING_ERROR,
      ERROR_CODES[Errors.FILE_PROCESSING_ERROR],
    );
  }
}

export class AIError extends AppErrors {
  constructor(message: string) {
    super(message, Errors.AI_ERROR, ERROR_CODES[Errors.AI_ERROR]);
  }
}

export class StorageError extends AppErrors {
  constructor(message: string) {
    super(message, Errors.STORAGE_ERROR, ERROR_CODES[Errors.STORAGE_ERROR]);
  }
}

export const handleApiError = (
  error: unknown,
): { error: string; message: string; statusCode: number } => {
  if (error instanceof AppErrors) {
    return {
      error: error.code,
      message: error.message,
      statusCode: error.statusCode,
    };
  }

  if (error instanceof Error) {
    return {
      error: Errors.UNKNOWN_ERROR,
      message: error.message,
      statusCode: ERROR_CODES[Errors.UNKNOWN_ERROR],
    };
  }

  return {
    error: Errors.UNKNOWN_ERROR,
    message: 'An unexpected error occurred',
    statusCode: ERROR_CODES[Errors.UNKNOWN_ERROR],
  };
};
