export interface Book {
  id: string;
  title: string;
  authors?: string[];
  description?: string;
  imageLinks?: {
    thumbnail: string;
    smallThumbnail: string;
  };
  averageRating?: number;
  categories?: string[];
  publishedDate?: string;
  pageCount?: number;
  language?: string;
}