/**
 * Deep merges two objects recursively
 * @param target The target object to merge into
 * @param source The source object to merge from
 * @returns The merged object
 */
export function deepMerge<T extends object = object>(
  target: T,
  source: Partial<T>
): T {
  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      const sourceKey = key as keyof typeof source;
      const targetKey = key as keyof typeof target;

      if (
        isObject(source[sourceKey]) &&
        key in target &&
        isObject(target[targetKey])
      ) {
        (output as any)[key] = deepMerge(
          target[targetKey] as object,
          source[sourceKey] as object
        );
      } else {
        (output as any)[key] = source[sourceKey];
      }
    });
  }

  return output;
}

/**
 * Checks if a value is an object
 * @param item The item to check
 * @returns Whether the item is an object
 */
function isObject(item: unknown): item is object {
  return item !== null && typeof item === "object" && !Array.isArray(item);
} 