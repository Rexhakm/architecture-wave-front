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
  
  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (isDevelopment) {
    return 'http://localhost:1337';
  } else {
    return 'https://architecture-backend.onrender.com';
  }
} 