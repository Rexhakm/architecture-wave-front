export interface Article {
  id: number;
  title: string;
  description: string;
  slug: string;
  category: string;
  secondCategory?: string;
  categoryColor: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
} 