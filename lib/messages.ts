// Runtime checks for structured messages read with t.raw(), which next-intl
// types loosely. A missing or malformed entry fails the static build.

export function stringList(value: unknown, key: string): string[] {
  if (Array.isArray(value) && value.every((item) => typeof item === "string")) return value;
  throw new Error(`Message "${key}" must be a list of strings.`);
}

export function stringRecord(value: unknown, key: string): Record<string, string> {
  if (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.values(value).every((item) => typeof item === "string")
  ) {
    return value as Record<string, string>;
  }
  throw new Error(`Message "${key}" must be an object of strings.`);
}
