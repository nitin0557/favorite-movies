import React, { useCallback } from "react";
import type { Favorite } from "../types/types";
import { v4 as uuidv4 } from "uuid";

export const FavoriteForm = React.memo(({
  form,
  setForm,
  onSubmit,
  onCancel,
}: {
  form: Favorite;
  setForm: React.Dispatch<React.SetStateAction<Favorite>>;
  onSubmit: (e?: React.FormEvent) => void;
  onCancel: () => void;
}) => {

  const handleChange = useCallback((
    key: keyof Favorite,
    value: string | null | undefined
  ) => {
    setForm({ ...form, [key]: value });
  },[]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!form.id) handleChange("id", uuidv4());
        onSubmit(e);
      }}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-700">
        {form.id ? "Edit Favorite" : "Add New Favorite"}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col">
          <span className="text-xs text-gray-600">Title *</span>
          <input
            required
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Movie title"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-xs text-gray-600">Type *</span>
          <select
            value={form.type}
            onChange={(e) =>
              handleChange("type", e.target.value as Favorite["type"])
            }
            className="mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Movie">Movie</option>
            <option value="TV Show">TV Show</option>
          </select>
        </label>

        <label className="flex flex-col col-span-2">
          <span className="text-xs text-gray-600">Director</span>
          <input
            value={form.director ?? ""}
            onChange={(e) => handleChange("director", e.target.value)}
            className="mt-1 p-2 border rounded"
            placeholder="Director name"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-xs text-gray-600">Duration</span>
          <input
            value={form.duration ?? ""}
            onChange={(e) => handleChange("duration", e.target.value)}
            className="mt-1 p-2 border rounded"
            placeholder="e.g. 2h 30m"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-xs text-gray-600">Year / Time</span>
          <input
            value={form.yearOrTime ?? ""}
            onChange={(e) => handleChange("yearOrTime", e.target.value)}
            className="mt-1 p-2 border rounded"
            placeholder="e.g. 2023"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-xs text-gray-600">Budget</span>
          <input
            value={form.budget ?? ""}
            onChange={(e) => handleChange("budget", e.target.value)}
            className="mt-1 p-2 border rounded"
            placeholder="e.g. $50M"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-xs text-gray-600">Location</span>
          <input
            value={form.location ?? ""}
            onChange={(e) => handleChange("location", e.target.value)}
            className="mt-1 p-2 border rounded"
            placeholder="e.g. Los Angeles"
          />
        </label>

        <label className="flex flex-col col-span-2">
          <span className="text-xs text-gray-600">Poster URL</span>
          <input
            value={form.posterUrl ?? ""}
            onChange={(e) => handleChange("posterUrl", e.target.value)}
            className="mt-1 p-2 border rounded"
            placeholder="https://example.com/poster.jpg"
          />
        </label>

        <label className="flex flex-col col-span-2">
          <span className="text-xs text-gray-600">Notes</span>
          <textarea
            value={form.notes ?? ""}
            onChange={(e) => handleChange("notes", e.target.value)}
            className="mt-1 p-2 border rounded min-h-[80px]"
            placeholder="Add any remarks or comments"
          />
        </label>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
          onClick={onSubmit}
        >
          Save
        </button>
      </div>
    </form>
  );
})
