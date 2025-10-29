const BASE_URL = "https://movies-backend-vert.vercel.app/api";

import axios from "axios";
import type { Favorite, FavoritesPage } from "../types/types";

const API_BASE = BASE_URL || "/api";

const authHeader = (token?: string | null) =>
  token ? { Authorization: `Bearer ${token}` } : {};

export const getFavorites = async (
  token: string | null | undefined,
  page = 1,
  limit = 20
): Promise<FavoritesPage> => {
  const res = await axios.get(
    `${API_BASE}/favorites?page=${page}&limit=${limit}`,
    {
      headers: { ...authHeader(token), "Content-Type": "application/json" },
    }
  );
  // Expect { items: Favorite[], hasMore: boolean }
  return res.data;
};

export const createFavorite = async (
  token: string | null | undefined,
  payload: Partial<Favorite>
) => {
  const res = await axios.post(`${API_BASE}/favorites`, payload, {
    headers: { ...authHeader(token), "Content-Type": "application/json" },
  });
  return res.data as Favorite;
};

export const updateFavorite = async (
  token: string | null | undefined,
  id: string,
  payload: Partial<Favorite>
) => {
  const res = await axios.put(`${API_BASE}/favorites/${id}`, payload, {
    headers: { ...authHeader(token), "Content-Type": "application/json" },
  });
  return res.data as Favorite;
};

export const deleteFavorite = async (
  token: string | null | undefined,
  id: string
) => {
  const res = await axios.delete(`${API_BASE}/favorites/${id}`, {
    headers: { ...authHeader(token) },
  });
  return res.data;
};
