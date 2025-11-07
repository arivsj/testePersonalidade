// Utility functions for the Personality Test app

/**
 * Formats a date string to a more readable format
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

/**
 * Calculates the percentage based on score and total
 * @param score - Current score
 * @param total - Maximum possible score
 * @returns Percentage value
 */
export const calculatePercentage = (score: number, total: number): number => {
  if (total <= 0) return 0;
  return Math.round((score / total) * 100);
};

/**
 * Validates an email address
 * @param email - Email string to validate
 * @returns Boolean indicating if email is valid
 */
export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};