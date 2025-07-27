/**
 * Generates a unique ID based on timestamp and random string
 * @returns A unique string ID
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};
