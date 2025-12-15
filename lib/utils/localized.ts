/**
 * Helper function to extract localized text from an object or string
 * Handles both API format {en: "...", ar: "..."} and plain strings
 */
export function getLocalizedText(
  value: unknown,
  locale: string
): string {
  if (!value) return '';
  
  // If it's already a string, return it
  if (typeof value === 'string') return value;
  
  // If it's a number, convert to string
  if (typeof value === 'number') return String(value);
  
  // If it's an object with localized content
  if (typeof value === 'object' && value !== null) {
    const obj = value as Record<string, unknown>;
    const localized = obj[locale] || obj['en'] || obj['ar'];
    if (typeof localized === 'string') return localized;
    if (typeof localized === 'number') return String(localized);
  }
  
  return '';
}

/**
 * Helper function to extract localized array items
 * Handles arrays of strings or arrays of localized objects
 */
export function getLocalizedArray(
  items: unknown[] | null | undefined,
  locale: string
): string[] {
  if (!items || !Array.isArray(items)) return [];
  
  return items
    .map(item => {
      // If item is a string, return it directly
      if (typeof item === 'string') return item;
      // If item is an object, try to get localized text
      if (typeof item === 'object' && item !== null) {
        return getLocalizedText(item, locale);
      }
      return '';
    })
    .filter(Boolean);
}
