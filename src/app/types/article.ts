export interface Article {
  id: number;
  title: string;
  description: string;
  slug: string;
  category: string;
  secondCategory?: string;
  categoryColor: string;
  coverImage: string;
  isPromoted?: boolean;
  // New: explicit flag from CMS to control homepage featured sections
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
} 