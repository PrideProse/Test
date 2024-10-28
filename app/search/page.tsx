"use client";

import { useState } from "react";
import { SearchBar } from "@/components/search/search-bar";
import { BookGrid } from "@/components/search/book-grid";
import { useSearchBooks } from "@/hooks/use-search-books";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const { books, isLoading, error } = useSearchBooks(query);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Discover Books</h1>
        <p className="text-muted-foreground">
          Search through millions of books to find your next read
        </p>
      </div>

      <SearchBar 
        value={query} 
        onChange={setQuery}
        className="max-w-2xl mx-auto mb-8"
      />

      <BookGrid books={books} isLoading={isLoading} error={error} />
    </div>
  );
}