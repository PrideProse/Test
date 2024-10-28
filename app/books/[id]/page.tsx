"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBookById } from "@/lib/google-books/api";
import { BookDetails } from "@/components/books/book-details";
import { LoadingBookDetails } from "@/components/books/loading-book-details";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import type { Book } from "@/types/books";

export default function BookPage() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchBook() {
      try {
        setIsLoading(true);
        const response = await getBookById(id as string);
        const bookData = {
          id: response.id,
          title: response.volumeInfo.title,
          authors: response.volumeInfo.authors,
          description: response.volumeInfo.description,
          imageLinks: response.volumeInfo.imageLinks,
          averageRating: response.volumeInfo.averageRating,
          categories: response.volumeInfo.categories,
          publishedDate: response.volumeInfo.publishedDate,
          pageCount: response.volumeInfo.pageCount,
          language: response.volumeInfo.language,
        };
        setBook(bookData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch book"));
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchBook();
    }
  }, [id]);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load book details. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return <LoadingBookDetails />;
  }

  if (!book) {
    return (
      <Alert>
        <AlertDescription>Book not found.</AlertDescription>
      </Alert>
    );
  }

  return <BookDetails book={book} />;
}