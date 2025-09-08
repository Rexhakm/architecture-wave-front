// Centralized category color mapping for consistent use across the application
export const CATEGORY_COLORS: { [key: string]: string } = {
  // Primary categories with hex colors
  'Architecture': '#D4A373',
  'Feeling Good': '#F2B5D4',
  'Lifestyle + Culture': '#FFD6A5',
  'Travel': '#B5E48C',
};

/**
 * Get the color for a specific category
 * @param category - The category name
 * @returns The hex color for the category, or default if not found
 */
export function getCategoryColor(category: string): string {
  if (!category) {
    return CATEGORY_COLORS['Architecture'] || '#D4A373';
  }

  // Handle special characters and spaces in category names
  const normalizedCategory = category.toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/\+/g, ' + ');

  // Find exact match first
  for (const [key, color] of Object.entries(CATEGORY_COLORS)) {
    if (key.toLowerCase() === normalizedCategory) {
      return color;
    }
  }

  // Fallback to default
  return CATEGORY_COLORS['Architecture'] || '#D4A373';
}

/**
 * Get all available category names
 * @returns Array of category names
 */
export function getCategoryNames(): string[] {
  return Object.keys(CATEGORY_COLORS);
}

/**
 * Check if a category exists
 * @param category - The category name to check
 * @returns True if the category exists, false otherwise
 */
export function hasCategory(category: string): boolean {
  if (!category) return false;
  
  const normalizedCategory = category.toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/\+/g, ' + ');

  return getCategoryNames().some(name => 
    name.toLowerCase() === normalizedCategory
  );
}
