import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Book } from "@/types/books";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardContent className="pt-4 flex-grow">
        <div className="aspect-[2/3] relative mb-4">
          <Image
            src={book.imageLinks?.thumbnail || "/placeholder-book.png"}
            alt={book.title}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <h3 className="font-semibold leading-tight mb-1 line-clamp-2">
          {book.title}
        </h3>
        {book.authors && (
          <p className="text-sm text-muted-foreground line-clamp-1">
            {book.authors.join(", ")}
          </p>
        )}
        {book.averageRating && (
          <div className="flex items-center gap-1 mt-2">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm">
              {book.averageRating.toFixed(1)}
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link href={`/books/${book.id}`} className="w-full">
          <Button variant="secondary" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}