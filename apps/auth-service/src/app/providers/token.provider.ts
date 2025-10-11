export abstract class TokenProvider {
  abstract generateToken<T extends object>(
    payload: T,
    expiresIn: number,
  ): Promise<string>;
  abstract validateToken<T extends object>(token: string): Promise<T>;
}
