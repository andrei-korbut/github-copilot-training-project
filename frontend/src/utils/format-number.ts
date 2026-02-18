/**
 * Formats a number with thousand separators
 * @param value - Numeric value to format
 * @returns Formatted number string with commas as thousand separators (e.g., "52,000")
 */
export function formatNumber(value: number): string {
  return value.toLocaleString('en-US');
}
