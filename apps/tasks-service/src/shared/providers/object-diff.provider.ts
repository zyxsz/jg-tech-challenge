export abstract class ObjectDiffProvider {
  abstract detailedDiff<T>(
    object1: T,
    object2: T,
  ): {
    added: Partial<T>;
    deleted: Partial<T>;
    updated: Partial<T>;
  };
}
