"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { supabase } from "@/lib/supabase/client";
import { toast } from "@/components/ui/use-toast";

export function useFavorite(bookId: string) {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkFavorite() {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("favorites")
          .select()
          .eq("user_id", user.id)
          .eq("book_id", bookId)
          .single();

        if (error && error.code !== "PGRST116") {
          throw error;
        }

        setIsFavorite(!!data);
      } catch (error) {
        console.error("Error checking favorite status:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to check favorite status",
        });
      } finally {
        setIsLoading(false);
      }
    }

    checkFavorite();
  }, [bookId, user]);

  const toggleFavorite = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to add books to favorites",
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isFavorite) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("book_id", bookId);

        if (error) throw error;

        setIsFavorite(false);
        toast({
          title: "Removed from favorites",
          description: "Book has been removed from your favorites",
        });
      } else {
        const { error } = await supabase.from("favorites").insert({
          user_id: user.id,
          book_id: bookId,
        });

        if (error) throw error;

        setIsFavorite(true);
        toast({
          title: "Added to favorites",
          description: "Book has been added to your favorites",
        });
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update favorites",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isFavorite, toggleFavorite, isLoading };
}