export abstract class HashProvider {
  abstract hash(payload: string): Promise<string>;
  abstract compare(hash: string, payload: string): Promise<boolean>;
}
