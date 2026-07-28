export type QueryValue =
  | string
  | number
  | boolean
  | null
  | undefined;

export function toQueryString(
  query?: Record<string, QueryValue>,
): string {
  if (!query) return "";

  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) continue;
    params.set(key, String(value));
  }

  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}
