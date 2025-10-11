export abstract class TokenProvider {
  abstract generateToken<T>(payload: T, expiresDate: Date): Promise<string>;
  abstract validateToken<T>(token: string): Promise<T>;
}
