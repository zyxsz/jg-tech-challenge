import { BaseError } from './base.error';

export class ConflictError extends BaseError {
  constructor(message?: string) {
    super(message ?? 'Conflict error', 400);
  }
}
