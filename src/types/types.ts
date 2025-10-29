export type Favorite = {
  id: string;
  title: string;
  type: "Movie" | "TV Show";
  director?: string | null;
  budget?: string | null;
  location?: string | null;
  duration?: string | null;
  yearOrTime?: string | null;
  notes?: string | null;
  posterUrl?: string | null;
  createdAt?: string;
};

export interface FavoritesPage {
  items: Favorite[];
  hasMore: boolean;
}
