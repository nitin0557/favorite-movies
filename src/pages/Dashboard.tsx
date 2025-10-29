import { useEffect, useState, useCallback, useMemo } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Header from "../components/Header";
import KPI from "../components/KPI";
import FavoriteTable from "../components/FavoritesTable";
import { FavoriteForm } from "../components/FavoriteForm";
import InfiniteScrollWrapper from "../components/InfiniteScrollWrapper";
import Modal from "../common/Modal";
import { useMovieStore } from "../store/movieStore";
import {
  createFavorite,
  deleteFavorite,
  updateFavorite,
} from "../services/favoritesApi";
import type { Favorite } from "../types/types";

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

  const [modalState, setModalState] = useState<{
    add: boolean;
    edit: boolean;
    delete: Favorite | null;
    details: Favorite | null;
  }>({
    add: false,
    edit: false,
    delete: null,
    details: null,
  });

  const [editing, setEditing] = useState<Favorite | null>(null);

  useEffect(() => {
    if (token) fetchInitial(token);
  }, [fetchInitial, token]);

  // 🧮 KPIs memoized
  const stats = useMemo(() => {
    const total = movies.length;
    const moviesCount = movies.filter((f) => f.type === "Movie").length;
    const showsCount = total - moviesCount;
    return { total, moviesCount, showsCount };
  }, [movies]);

  // 🧠 Handlers
  const resetForm = useCallback(() => {
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
  }, []);

  const openAdd = useCallback(() => {
    resetForm();
    setModalState((prev) => ({ ...prev, add: true }));
  }, [resetForm]);

  const submitAdd = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!token) return;
      await createFavorite(token, form);
      setModalState((prev) => ({ ...prev, add: false }));
      fetchInitial(token);
    },
    [token, form, fetchInitial]
  );

  const openEdit = useCallback((entry: Favorite) => {
    setEditing(entry);
    setForm(entry);
    setModalState((prev) => ({ ...prev, edit: true }));
  }, []);

  const submitEdit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!token || !editing?.id) return;
      await updateFavorite(token, editing.id, form);
      setEditing(null);
      setModalState((prev) => ({ ...prev, edit: false }));
      fetchInitial(token);
    },
    [token, editing, form, fetchInitial]
  );

  const requestDelete = useCallback(
    (entry: Favorite) =>
      setModalState((prev) => ({ ...prev, delete: entry })),
    []
  );

  const confirmDeleteNow = useCallback(async () => {
    if (!token || !modalState.delete?.id) return;
    await deleteFavorite(token, modalState.delete.id);
    setModalState((prev) => ({ ...prev, delete: null }));
    fetchInitial(token);
  }, [token, modalState.delete, fetchInitial]);

  const handleRowClick = useCallback(
    (item: Favorite) =>
      setModalState((prev) => ({ ...prev, details: item })),
    []
  );

  const closeAllModals = useCallback(() => {
    setModalState({
      add: false,
      edit: false,
      delete: null,
      details: null,
    });
  }, []);

  return (
    <DashboardLayout occupiedCount={stats.moviesCount} totalSeats={stats.total}>
      <Header />

      <div className="p-4 sm:p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KPI title="Total Favorites" value={stats.total} />
          <KPI title="Movies" value={stats.moviesCount} />
          <KPI title="TV Shows" value={stats.showsCount} />
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
              onRowClick={handleRowClick}
            />
          </InfiniteScrollWrapper>
        )}
      </div>

      {modalState.add && (
        <Modal title="Add New Favorite" onClose={closeAllModals}>
          <FavoriteForm
            form={form}
            setForm={setForm}
            onSubmit={submitAdd}
            onCancel={closeAllModals}
          />
        </Modal>
      )}

      {modalState.edit && (
        <Modal title="Edit Favorite" onClose={closeAllModals}>
          <FavoriteForm
            form={form}
            setForm={setForm}
            onSubmit={submitEdit}
            onCancel={closeAllModals}
          />
        </Modal>
      )}

      {modalState.delete && (
        <Modal title="Confirm Delete" onClose={closeAllModals}>
          <p>Are you sure you want to delete “{modalState.delete.title}”?</p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={closeAllModals}
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

      {modalState.details && (
        <Modal title="Movie Details" onClose={closeAllModals}>
          <div className="space-y-2">
            <p>
              <strong>Title:</strong> {modalState.details.title}
            </p>
            <p>
              <strong>Type:</strong> {modalState.details.type}
            </p>
            {modalState.details.director && (
              <p>
                <strong>Director:</strong> {modalState.details.director}
              </p>
            )}
            {modalState.details.yearOrTime && (
              <p>
                <strong>Year:</strong> {modalState.details.yearOrTime}
              </p>
            )}
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}
