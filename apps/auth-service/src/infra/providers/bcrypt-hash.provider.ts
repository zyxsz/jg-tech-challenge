import { HashProvider } from '@/app/providers/hash.provider';
import { compare, hash } from 'bcryptjs';

export class BcryptHashProvider implements HashProvider {
  hash(payload: string): Promise<string> {
    return hash(payload, 5);
  }

  compare(payload: string, hash: string): Promise<boolean> {
    return compare(payload, hash);
  }
}
