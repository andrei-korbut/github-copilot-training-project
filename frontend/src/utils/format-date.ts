/**
 * Formats an ISO date string into a human-readable format
 * @param isoDate - ISO 8601 date string (e.g., "2026-01-15T10:30:00")
 * @returns Formatted date string (e.g., "Jan 15, 2026")
 */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  
  return date.toLocaleDateString('en-US', options);
}
