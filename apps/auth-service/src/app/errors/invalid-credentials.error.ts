import { BaseError } from './base.error';

export class InvalidCredentialsError extends BaseError {
  constructor(message?: string) {
    super(message ?? 'Invalid credentials', 400);
  }
}
