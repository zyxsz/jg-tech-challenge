export abstract class ObjectDiffProvider {
  abstract detailedDiff(
    object1: object,
    object2: object,
  ): {
    added: object;
    deleted: object;
    updated: object;
  };
}
