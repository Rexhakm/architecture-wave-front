// Centralized category color mapping for consistent use across the application
export const CATEGORY_COLORS: { [key: string]: string } = {
  // Primary categories with hex colors
  'Architecture + Design': '#88B056',
  'Feeling Good': '#E470AA',
  'Lifestyle + Culture': '#DCBB69',
  'Travel': '#9770E4',
};

/**
 * Get the color for a specific category
 * @param category - The category name
 * @returns The hex color for the category, or default if not found
 */
export function getCategoryColor(category: string): string {
  if (!category) {
    return CATEGORY_COLORS['Architecture + Design'] || '#D4A373';
  }

  // Normalize incoming category strings and alias legacy names
  const normalizedCategory = category
    .toLowerCase()
    .replace(/-/g, ' ')
    // Normalize plus to a spaced form for consistent comparison
    .replace(/\s*\+\s*/g, ' + ')
    .replace(/\s+/g, ' ')
    .trim();

  const alias = (name: string): string => {
    if (name === 'architecture') return 'architecture + design';
    if (name === 'architecture+design') return 'architecture + design';
    if (name === 'architecture + design') return 'architecture + design';
    return name;
  };

  const target = alias(normalizedCategory)
    .replace(/\s*\+\s*/g, ' + ')
    .replace(/\s+/g, ' ')
    .trim();

  for (const [key, color] of Object.entries(CATEGORY_COLORS)) {
    const keyNormalized = key
      .toLowerCase()
      .replace(/\s*\+\s*/g, ' + ')
      .replace(/\s+/g, ' ')
      .trim();
    if (keyNormalized === target) {
      return color;
    }
  }

  // Fallback to default
  return CATEGORY_COLORS['Architecture + Design'] || '#D4A373';
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
  
  const normalizedCategory = category
    .toLowerCase()
    .replace(/-/g, ' ')
    .replace(/\s+and\s+/g, ' + ')
    .replace(/\s*\+\s*/g, ' + ')
    .replace(/\s+/g, ' ')
    .trim();

  const alias = (name: string): string => {
    if (name === 'architecture') return 'architecture + design';
    if (name === 'architecture+design') return 'architecture + design';
    if (name === 'architecture + design') return 'architecture + design';
    if (name === 'lifestyle and culture') return 'lifestyle + culture';
    return name;
  };

  return getCategoryNames().some(name => 
    name
      .toLowerCase()
      .replace(/\s*\+\s*/g, ' + ')
      .replace(/\s+/g, ' ')
      .trim() === alias(normalizedCategory)
  );
}
