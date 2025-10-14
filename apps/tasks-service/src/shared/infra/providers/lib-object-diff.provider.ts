import { ObjectDiffProvider } from '@/shared/providers/object-diff.provider';
import { detailedDiff } from 'deep-object-diff';

export class LibObjectDiffProvider implements ObjectDiffProvider {
  detailedDiff(
    object1: object,
    object2: object,
  ): { added: object; deleted: object; updated: object } {
    return detailedDiff(object1, object2);
  }
}
