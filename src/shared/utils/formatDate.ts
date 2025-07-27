/**
 * Formats a Date object into a human-readable string
 * @param date - The Date object to format
 * @returns A formatted date string (e.g., "Jan 15, 2024")
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};
