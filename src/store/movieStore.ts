import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  getFavorites,
  createFavorite,
  updateFavorite,
  deleteFavorite,
} from "../services/favoritesApi";
import type { Favorite } from "../types/types";

export interface Movie {
  _id: string;
  title: string;
  posterUrl: string;
  yearOrTime: string;
}

interface MovieListStore {
  trending: Movie[];
  topRated: Movie[];
  newReleases: Movie[];
  recommended: Movie[];
  action: Movie[];
  comedy: Movie[];
  sciFi: Movie[];

  setMovies: (
    type: keyof Omit<MovieListStore, "setMovies">,
    movies: Movie[]
  ) => void;
}

export const useMovieListStore = create<MovieListStore>((set) => ({
  trending: [],
  topRated: [],
  newReleases: [],
  recommended: [],
  action: [],
  comedy: [],
  sciFi: [],
  setMovies: (type, movies) => set({ [type]: movies }),
}));

export type MoviePage = {
  items: Favorite[];
  hasMore: boolean;
};

export type MovieStoreState = {
  movies: Favorite[];
  page: number;
  pageSize: number;
  hasMore: boolean;

  search: string;
  loading: boolean;
  loadingMore: boolean;
  error?: string | null;

  reset: () => void;
  setSearch: (q: string) => void;

  fetchInitial: (token?: string | null) => Promise<void>;
  fetchNext: (token?: string | null) => Promise<void>;
  fetchMore: (token: string | null) => Promise<void>;
  addMovie: (
    token: string | null | undefined,
    payload: Partial<Favorite>
  ) => Promise<Favorite | void>;
  editMovie: (
    token: string | null | undefined,
    id: string,
    payload: Partial<Favorite>
  ) => Promise<Favorite | void>;
  removeMovie: (token: string | null | undefined, id: string) => Promise<void>;
};

export const useMovieStore = create<MovieStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        movies: [],
        page: 1,
        pageSize: 20,
        hasMore: true,
        search: "",
        loading: false,
        loadingMore: false,
        error: null,

        reset: () =>
          set({
            movies: [],
            page: 1,
            hasMore: true,
            search: "",
            loading: false,
            loadingMore: false,
            error: null,
          }),

        setSearch: (q: string) => set({ search: q }),

        fetchInitial: async (token) => {
          set({ loading: true, error: null });
          try {
            const { pageSize } = get();
            const res = await getFavorites(token, 1, pageSize);
            set({
              movies: res.items,
              page: 2,
              hasMore: res.hasMore ?? res.items.length === pageSize,
            });
          } catch (err: any) {
            set({ error: err?.message ?? String(err) });
          } finally {
            set({ loading: false });
          }
        },

        fetchMore: async (token) => {
          const { page, movies, hasMore, loading } = get();
          if (!hasMore || loading) return;
          set({ loading: true });
          try {
            const res = await fetch(
              `https://movies-backend-vert.vercel.app/api/favorites?page=${
                page + 1
              }&limit=10`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            const text = await res.text();
            let data;
            try {
              data = JSON.parse(text);
            } catch {
              console.error("Invalid JSON returned:", text.slice(0, 200));
              throw new Error("Backend did not return valid JSON");
            }

            set({
              movies: [...movies, ...data.items],
              page: page + 1,
              hasMore: data.hasMore,
              loading: false,
            });
          } catch (err: any) {
            set({ error: err?.message ?? String(err), loading: false });
          }
        },

        fetchNext: async (token) => {
          const { loadingMore, hasMore, page, pageSize } = get();
          if (loadingMore || !hasMore) return;
          set({ loadingMore: true, error: null });
          try {
            const res = await getFavorites(token, page, pageSize);
            set((s) => ({
              movies: [...s.movies, ...res.items],
              page: s.page + 1,
              hasMore: res.hasMore ?? res.items.length === pageSize,
            }));
          } catch (err: any) {
            set({ error: err?.message ?? String(err) });
          } finally {
            set({ loadingMore: false });
          }
        },

        addMovie: async (token, payload) => {
          try {
            const temp: Favorite = {
              ...(payload as Favorite),
              id: `tmp-${Date.now()}`,
            };
            set((s) => ({ movies: [temp, ...s.movies] }));

            const created = await createFavorite(token, payload);
            if (created?.id) {
              set((s) => ({
                movies: s.movies.map((m) => (m.id === temp.id ? created : m)),
              }));
            }
            return created;
          } catch (err: any) {
            set((s) => ({
              movies: s.movies.filter((m) => !String(m.id).startsWith("tmp-")),
              error: err?.message ?? String(err),
            }));
          }
        },

        editMovie: async (token, id, payload) => {
          try {
            set((s) => ({
              movies: s.movies.map((m) =>
                m.id === id ? { ...m, ...(payload as any) } : m
              ),
            }));
            const updated = await updateFavorite(token, id, payload);
            set((s) => ({
              movies: s.movies.map((m) => (m.id === updated.id ? updated : m)),
            }));
            return updated;
          } catch (err: any) {
            set({ error: err?.message ?? String(err) });
          }
        },

        removeMovie: async (token, id) => {
          const prev = get().movies;
          try {
            set((s) => ({ movies: s.movies.filter((m) => m.id !== id) }));
            await deleteFavorite(token, id);
          } catch (err: any) {
            set({ movies: prev, error: err?.message ?? String(err) });
          }
        },
      }),
      { name: "movie-store" }
    )
  )
);
