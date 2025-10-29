import { useEffect, useState } from "react";
import KPI from "../components/KPI";
import DashboardLayout from "../layouts/DashboardLayout";
import Header from "../components/Header";
import type { Favorite } from "../types/types";
import FavoriteTable from "../components/FavoritesTable";
import FavoriteForm from "../components/FavoriteForm";
import InfiniteScrollWrapper from "../components/InfiniteScrollWrapper";
import { useMovieStore } from "../store/movieStore";
import Modal from "../common/Modal";
import {
  createFavorite,
  deleteFavorite,
  updateFavorite,
} from "../services/favoritesApi";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const { movies, loading, error, fetchInitial, fetchMore, hasMore } =
    useMovieStore();

  const [form, setForm] = useState<Favorite>({
    id: "",
    title: "",
    type: "Movie",
    director: "",
    duration: "",
    yearOrTime: "",
    notes: "",
    posterUrl: "",
  });
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editing, setEditing] = useState<Favorite | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Favorite | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Favorite | null>(null);

  useEffect(() => {
    if (token) fetchInitial(token);
  }, [fetchInitial, token]);

  const totalFavorites = movies.length;
  const moviesCount = movies.filter((f) => f.type === "Movie").length;
  const showsCount = movies.filter((f) => f.type === "TV Show").length;

  const openAdd = () => {
    setForm({
      id: "",
      title: "",
      type: "Movie",
      director: "",
      duration: "",
      yearOrTime: "",
      notes: "",
      posterUrl: "",
    });
    setIsAddOpen(true);
  };

  const submitAdd = async (e?: React.FormEvent) => {
    e?.preventDefault();
    await createFavorite(token, form);
    setIsAddOpen(false);
    fetchInitial(token);
  };

  const submitEdit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!editing?.id) return;
    await updateFavorite(token, editing.id, form);
    setIsEditOpen(false);
    setEditing(null);
    fetchInitial(token);
  };

  const confirmDeleteNow = async () => {
    if (!confirmDelete?.id) return;
    await deleteFavorite(token, confirmDelete.id);
    setConfirmDelete(null);
    fetchInitial(token);
  };

  const openEdit = (entry: Favorite) => {
    setEditing(entry);
    setForm(entry);
    setIsEditOpen(true);
  };

  const requestDelete = (entry: Favorite) => setConfirmDelete(entry);

  const handleRowClick = (item: Favorite) => {
    setSelectedMovie(item);
  };

  return (
    <DashboardLayout occupiedCount={moviesCount} totalSeats={totalFavorites}>
      <Header />

      <div className="p-4 sm:p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KPI title="Total Favorites" value={totalFavorites} />
          <KPI title="Movies" value={moviesCount} />
          <KPI title="TV Shows" value={showsCount} />
        </div>

        <div className="flex justify-end">
          <button
            onClick={openAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            + Add Favorite
          </button>
        </div>

        {error ? (
          <p className="text-center text-red-500 mt-6">Error: {error}</p>
        ) : (
          <InfiniteScrollWrapper
            loadMore={() => fetchMore(token)}
            hasMore={hasMore}
            loading={loading}
          >
            <FavoriteTable
              filtered={movies}
              openEdit={openEdit}
              requestDelete={requestDelete}
              onRowClick={handleRowClick} // ✅ Correct type
            />
          </InfiniteScrollWrapper>
        )}
      </div>

      {isAddOpen && (
        <Modal title="Add New Favorite" onClose={() => setIsAddOpen(false)}>
          <FavoriteForm
            form={form}
            setForm={setForm}
            onSubmit={submitAdd}
            onCancel={() => setIsAddOpen(false)}
          />
        </Modal>
      )}

      {isEditOpen && (
        <Modal title="Edit Favorite" onClose={() => setIsEditOpen(false)}>
          <FavoriteForm
            form={form}
            setForm={setForm}
            onSubmit={submitEdit}
            onCancel={() => setIsEditOpen(false)}
          />
        </Modal>
      )}

      {confirmDelete && (
        <Modal title="Confirm Delete" onClose={() => setConfirmDelete(null)}>
          <p>Are you sure you want to delete “{confirmDelete.title}”?</p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setConfirmDelete(null)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              onClick={confirmDeleteNow}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}

      {selectedMovie && (
        <Modal title="Movie Details" onClose={() => setSelectedMovie(null)}>
          <div className="space-y-2">
            <p>
              <strong>Title:</strong> {selectedMovie.title}
            </p>
            <p>
              <strong>Type:</strong> {selectedMovie.type}
            </p>
            {selectedMovie.director && (
              <p>
                <strong>Director:</strong> {selectedMovie.director}
              </p>
            )}
            {selectedMovie.yearOrTime && (
              <p>
                <strong>Year:</strong> {selectedMovie.yearOrTime}
              </p>
            )}
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}
