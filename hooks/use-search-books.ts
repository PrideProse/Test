"use client";

import { useEffect, useState } from "react";
import { searchBooks } from "@/lib/google-books/api";
import type { Book } from "@/types/books";

export function useSearchBooks(query: string) {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setBooks(null);
      return;
    }

    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await searchBooks(query);
        const formattedBooks = response.items?.map((item: any) => ({
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors,
          description: item.volumeInfo.description,
          imageLinks: item.volumeInfo.imageLinks,
          averageRating: item.volumeInfo.averageRating,
          categories: item.volumeInfo.categories,
          publishedDate: item.volumeInfo.publishedDate,
          pageCount: item.volumeInfo.pageCount,
          language: item.volumeInfo.language,
        })) || [];
        setBooks(formattedBooks);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch books"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  return { books, isLoading, error };
}