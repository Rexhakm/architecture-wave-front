// URL utility functions for absolute URL handling
const BASE = (process.env.NEXT_PUBLIC_BASE_URL || "").replace(/\/$/, "");

/**
 * Converts a relative URL to an absolute URL
 * @param url - The URL to convert (can be relative or absolute)
 * @returns The absolute URL or null if no URL provided or base URL is invalid
 */
export const abs = (url?: string | null) => {
  if (!url) return null;
  
  // If no base URL is configured, return null
  if (!BASE) return null;
  
  try {
    return new URL(url, BASE).toString();
  } catch (error) {
    // If URL construction fails, return null
    console.warn('Failed to construct absolute URL:', error);
    return null;
  }
};

/**
 * Gets the absolute URL with fallback to relative URL
 * @param url - The URL to convert
 * @returns The absolute URL if available, otherwise the original relative URL
 */
export const absOrFallback = (url: string): string => {
  return abs(url) || url;
};

/**
 * Gets the base URL for the application
 * @returns The base URL without trailing slash
 */
export const getBaseUrl = () => BASE;

/**
 * Checks if a URL is already absolute
 * @param url - The URL to check
 * @returns True if the URL is absolute
 */
export const isAbsoluteUrl = (url: string): boolean => {
  return url.startsWith('http://') || url.startsWith('https://');
};

/**
 * Ensures a URL is absolute, converting relative URLs if necessary
 * @param url - The URL to ensure is absolute
 * @returns The absolute URL
 */
export const ensureAbsoluteUrl = (url: string): string => {
  if (isAbsoluteUrl(url)) {
    return url;
  }
  return abs(url) || url;
}; 