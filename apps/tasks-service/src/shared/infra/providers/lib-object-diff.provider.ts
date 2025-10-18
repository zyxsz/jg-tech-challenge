import { ObjectDiffProvider } from '@/shared/providers/object-diff.provider';
import { detailedDiff } from 'deep-object-diff';

export class LibObjectDiffProvider implements ObjectDiffProvider {
  detailedDiff<T>(
    object1: T,
    object2: T,
  ): { added: Partial<T>; deleted: Partial<T>; updated: Partial<T> } {
    return detailedDiff(object1 as object, object2 as object);
  }
}
