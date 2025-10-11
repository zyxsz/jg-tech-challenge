export class BaseError extends Error {
  private _errorCode: number;

  constructor(message: string, code: number) {
    super(message);

    this._errorCode = code;
  }

  public get code() {
    return this._errorCode;
  }
}
