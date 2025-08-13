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
  createdAt: string;
  updatedAt: string;
} 