// Utility function to get the correct image URL
export function getImageUrl(imagePath: string): string {
  if (!imagePath) return '';
  
  // If the image path already starts with http, return it as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // For relative paths, construct the full URL
  // Use environment-specific backend URL
  const baseUrl = getBackendBaseUrl();
  
  // Remove leading slash if present to avoid double slashes
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  return `${baseUrl}/${cleanPath}`;
}

// Helper function to get the backend base URL based on environment
export function getBackendBaseUrl(): string {
  // Check for environment variables first (for custom configurations)
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_URL;
  }
  
  // Always use production Strapi backend regardless of frontend environment
  return 'https://architecture-backend.onrender.com';
}

// Cloudinary helper functions
export const createCloudinaryThumbnailUrl = (originalUrl: string): string | null => {
  const parts = originalUrl.split('/upload/');
  if (parts.length !== 2) return null;

  const [prefix, suffix] = parts;
  return `${prefix}/upload/w_400,h_300,c_thumb,g_auto/${suffix}`;
};

export const createCloudinaryBlurUrl = (originalUrl: string): string | null => {
  const parts = originalUrl.split('/upload/');
  if (parts.length !== 2) return null;

  const [prefix, suffix] = parts;
  return `${prefix}/upload/e_blur:500,w_10,h_10,c_thumb,g_auto/${suffix}`;
}; 