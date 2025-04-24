import {
  AppErrors,
  ValidationError,
  FileProcessingError,
  AIError,
  StorageError,
  handleApiError,
} from '@/helpers/errors/app-errors';

import { Errors } from '@/helpers/enums/errors';
import { ERROR_CODES } from '@/helpers/constants/errors';

describe('AppErrors and subclasses', () => {
  it('should create AppErrors with expected properties', () => {
    const error = new AppErrors('Something went wrong', 'GENERIC_ERROR', 500);
    expect(error).toBeInstanceOf(AppErrors);
    expect(error.message).toBe('Something went wrong');
    expect(error.code).toBe('GENERIC_ERROR');
    expect(error.statusCode).toBe(500);
  });

  it('should create ValidationError with proper code and status', () => {
    const error = new ValidationError('Invalid input');
    expect(error).toBeInstanceOf(AppErrors);
    expect(error).toBeInstanceOf(ValidationError);
    expect(error.code).toBe(Errors.VALIDATION_ERROR);
    expect(error.statusCode).toBe(ERROR_CODES[Errors.VALIDATION_ERROR]);
  });

  it('should create FileProcessingError with proper code and status', () => {
    const error = new FileProcessingError('Corrupted PDF');
    expect(error).toBeInstanceOf(AppErrors);
    expect(error.code).toBe(Errors.FILE_PROCESSING_ERROR);
    expect(error.statusCode).toBe(ERROR_CODES[Errors.FILE_PROCESSING_ERROR]);
  });

  it('should create AIError with proper code and status', () => {
    const error = new AIError('AI service failed');
    expect(error.code).toBe(Errors.AI_ERROR);
    expect(error.statusCode).toBe(ERROR_CODES[Errors.AI_ERROR]);
  });

  it('should create StorageError with proper code and status', () => {
    const error = new StorageError('Disk quota exceeded');
    expect(error.code).toBe(Errors.STORAGE_ERROR);
    expect(error.statusCode).toBe(ERROR_CODES[Errors.STORAGE_ERROR]);
  });
});

describe('handleApiError', () => {
  it('should handle known AppErrors', () => {
    const error = new ValidationError('Missing field');
    const result = handleApiError(error);
    expect(result).toEqual({
      error: Errors.VALIDATION_ERROR,
      message: 'Missing field',
      statusCode: ERROR_CODES[Errors.VALIDATION_ERROR],
    });
  });

  it('should handle unknown Error instances', () => {
    const error = new Error('Some other error');
    const result = handleApiError(error);
    expect(result).toEqual({
      error: Errors.UNKNOWN_ERROR,
      message: 'Some other error',
      statusCode: ERROR_CODES[Errors.UNKNOWN_ERROR],
    });
  });

  it('should handle non-error values', () => {
    const result = handleApiError('oops');
    expect(result).toEqual({
      error: Errors.UNKNOWN_ERROR,
      message: 'An unexpected error occurred',
      statusCode: ERROR_CODES[Errors.UNKNOWN_ERROR],
    });
  });
});
