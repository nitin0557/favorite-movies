import { useEffect, useState, useRef, useCallback } from "react";
import { useMovieStore } from "../store/movieStore";
import FavoriteTable from "../components/FavoritesTable";
import Spinner from "../components/Spinner";
import Header from "../components/Header";
import SearchInput from "../common/SearchInput";
import Select from "../common/Select";
import DashboardLayout from "../layouts/DashboardLayout";
import MovieDetailModal from "../components/MoviesDetailModal";

export default function MoviesList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("");
  const [sortField, setSortField] = useState<"title" | "yearOrTime">("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);
  const [editMovie, setEditMovie] = useState<any | null>(null); // 👈 for editing state

  const loaderRef = useRef<HTMLDivElement>(null);
  const { movies, fetchInitial, fetchMore, hasMore, loading } = useMovieStore();

  const moviesCount = movies.filter((f) => f.type === "Movie").length;
  const totalFavorites = movies.length;

  // ✅ Fetch initial movies
  useEffect(() => {
    fetchInitial(localStorage.getItem("token"));
  }, [fetchInitial]);

  // ✅ Filter + Sort
  let filteredMovies = filterType
    ? movies.filter((m) => m.type === filterType)
    : movies;

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredMovies = filteredMovies.filter(
      (m) =>
        (m.title ?? "").toLowerCase().includes(term) ||
        (m.director ?? "").toLowerCase().includes(term)
    );
  }

  filteredMovies = filteredMovies.sort((a, b) => {
    const aValue = String(a[sortField] ?? "").toLowerCase();
    const bValue = String(b[sortField] ?? "").toLowerCase();
    return sortOrder === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        fetchMore(localStorage.getItem("token"));
      }
    },
    [fetchMore, hasMore, loading]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  const displayedMovies = filteredMovies.slice(0, visibleCount);

  useEffect(() => {
    if (hasMore && filteredMovies.length > visibleCount)
      setVisibleCount((prev) => prev + 8);
  }, [movies]);

  return (
    <>
      <DashboardLayout occupiedCount={moviesCount} totalSeats={totalFavorites}>
        <Header />
        <div className="p-6 space-y-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-gray-800">Movies</h1>

          {/* 🔍 Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <SearchInput value={searchTerm} onSearch={setSearchTerm} />

            <Select
              value={filterType}
              onChangeValue={setFilterType}
              options={[
                { value: "", label: "All" },
                { value: "Movie", label: "Movie" },
                { value: "Series", label: "Series" },
              ]}
            />

            <Select
              value={sortField}
              onChangeValue={(v) => setSortField(v as "title" | "yearOrTime")}
              options={[
                { value: "title", label: "Title" },
                { value: "yearOrTime", label: "Year / Time" },
              ]}
            />

            <Select
              value={sortOrder}
              onChangeValue={(v) => setSortOrder(v as "asc" | "desc")}
              options={[
                { value: "asc", label: "Ascending" },
                { value: "desc", label: "Descending" },
              ]}
            />

            {(filterType || searchTerm) && (
              <button
                onClick={() => {
                  setFilterType("");
                  setSearchTerm("");
                }}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600
                 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Clear Filters
              </button>
            )}
          </div>
          <div className="overflow-x-auto">
            {displayedMovies.length > 0 ? (
              <FavoriteTable
                filtered={displayedMovies}
                onRowClick={(movie) => setSelectedMovie(movie)}
                openEdit={() => {}}
                requestDelete={() => {}}
              />
            ) : loading ? (
              <Spinner />
            ) : (
              <p className="text-gray-500 py-4">No movies found.</p>
            )}
          </div>

          <div
            ref={loaderRef}
            className="h-10 flex justify-center items-center"
          >
            {loading && hasMore && <Spinner />}
          </div>
        </div>
      </DashboardLayout>

      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}
