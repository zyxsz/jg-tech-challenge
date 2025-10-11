export abstract class HashProvider {
  abstract hash(payload: string): Promise<string>;
  abstract compare(payload: string, hash: string): Promise<boolean>;
}
