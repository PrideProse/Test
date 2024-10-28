import { Button } from "@/components/ui/button";
import { BookOpen, Search, Star } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12 text-center">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
        Welcome to <span className="text-primary">BookVerse</span>
      </h1>
      <p className="mt-4 text-xl text-muted-foreground max-w-[700px] mx-auto">
        Your digital reading companion. Discover new books, track your reading progress, and connect with fellow readers.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full max-w-4xl">
        <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-lg">
          <Search className="h-12 w-12 mb-4 text-primary" />
          <h2 className="text-xl font-semibold mb-2">Discover</h2>
          <p className="text-muted-foreground text-center">Find your next favorite book from millions of titles</p>
        </div>
        
        <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-lg">
          <BookOpen className="h-12 w-12 mb-4 text-primary" />
          <h2 className="text-xl font-semibold mb-2">Track</h2>
          <p className="text-muted-foreground text-center">Keep track of your reading progress and library</p>
        </div>
        
        <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-lg">
          <Star className="h-12 w-12 mb-4 text-primary" />
          <h2 className="text-xl font-semibold mb-2">Rate</h2>
          <p className="text-muted-foreground text-center">Share your thoughts and discover personalized recommendations</p>
        </div>
      </div>

      <div className="flex gap-4 mt-12">
        <Link href="/search">
          <Button size="lg">
            Start Exploring
            <Search className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link href="/signup">
          <Button variant="outline" size="lg">
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
}