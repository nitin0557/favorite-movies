import { useEffect, useState, useRef, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { getFavorites } from "../services/favoritesApi";
import type { Favorite } from "../types/types";

export default function Favorites() {
  const { token } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastFavoriteRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token || !hasMore) return;

      try {
        setIsLoading(true);
        const data = await getFavorites(token, page); // ⬅️ modify backend to accept ?page=
        if (data.items && data.items.length > 0) {
          setFavorites((prev) => [...prev, ...data.items]);
        } else {
          setHasMore(false); // no more data
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [token, page]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Favorites</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favorites.map((fav, index) => {
          if (favorites.length === index + 1) {
            return (
              <div
                ref={lastFavoriteRef}
                key={fav.id}
                className="bg-white shadow p-4 rounded-lg"
              >
                <img
                  src={fav.posterUrl ?? ""}
                  alt={fav.title}
                  className="h-48 w-full object-cover rounded"
                />
                <h3 className="text-lg mt-2 font-semibold">{fav.title}</h3>
                <p className="text-sm text-gray-500">{fav.director}</p>
              </div>
            );
          } else {
            return (
              <div key={fav.id} className="bg-white shadow p-4 rounded-lg">
                <img
                  src={fav.posterUrl ?? ""}
                  alt={fav.title}
                  className="h-48 w-full object-cover rounded"
                />
                <h3 className="text-lg mt-2 font-semibold">{fav.title}</h3>
                <p className="text-sm text-gray-500">{fav.director}</p>
              </div>
            );
          }
        })}
      </div>

      {isLoading && (
        <div className="flex justify-center py-6">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {!hasMore && (
        <p className="text-center text-gray-500 py-6">No more favorites.</p>
      )}
    </div>
  );
}
