"use client";

import Image from "next/image";
import { useAuth } from "@/components/auth/auth-provider";
import { useFavorite } from "@/hooks/use-favorite";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Calendar, Heart, Languages, Star } from "lucide-react";
import type { Book } from "@/types/books";

interface BookDetailsProps {
  book: Book;
}

export function BookDetails({ book }: BookDetailsProps) {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite, isLoading } = useFavorite(book.id);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="aspect-[2/3] relative rounded-lg overflow-hidden">
            <Image
              src={book.imageLinks?.thumbnail || "/placeholder-book.png"}
              alt={book.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {user && (
            <Button
              variant={isFavorite ? "default" : "outline"}
              className="w-full mt-4"
              onClick={() => toggleFavorite()}
              disabled={isLoading}
            >
              <Heart
                className={`mr-2 h-4 w-4 ${
                  isFavorite ? "fill-current" : ""
                }`}
              />
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          )}
        </div>

        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          {book.authors && (
            <p className="text-lg text-muted-foreground mb-4">
              by {book.authors.join(", ")}
            </p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {book.averageRating && (
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <span>{book.averageRating.toFixed(1)}</span>
              </div>
            )}
            {book.pageCount && (
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span>{book.pageCount} pages</span>
              </div>
            )}
            {book.publishedDate && (
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{new Date(book.publishedDate).getFullYear()}</span>
              </div>
            )}
            {book.language && (
              <div className="flex items-center gap-2">
                <Languages className="h-5 w-5" />
                <span>{book.language.toUpperCase()}</span>
              </div>
            )}
          </div>

          {book.categories && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {book.categories.map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}

          <Separator className="my-6" />

          {book.description && (
            <div
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: book.description }}
            />
          )}
        </div>
      </div>
    </div>
  );
}