export class BaseError extends Error {
  private _errorStatusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);

    this._errorStatusCode = statusCode;
  }

  public get message(): string {
    return this.message;
  }

  public get statusCode() {
    return this._errorStatusCode;
  }
}
