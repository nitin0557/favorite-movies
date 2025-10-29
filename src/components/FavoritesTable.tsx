import React, { useCallback } from "react";
import { useLocation } from "react-router-dom";
import type { Favorite } from "../types/types";


interface FavoriteTableProps {
  filtered: Favorite[];
  openEdit: (item: Favorite) => void;
  requestDelete: (item: Favorite) => void;
  onRowClick?: (item: Favorite) => void;
}

const FavoriteTable: React.FC<FavoriteTableProps> = React.memo(({
  filtered,
  openEdit,
  requestDelete,
  onRowClick,
}) => {
  const location = useLocation();
  const isMovieListPage = location.pathname === "/movieslist"; 

  const handleRowClick = useCallback((e: React.MouseEvent, item: Favorite) => {
    const target = e.target as HTMLElement;
    if (target.closest("button")) return;
    if (onRowClick) onRowClick(item);
  },[]);

  return (
    <div className="h-[60vh] overflow-auto">
      <table className="min-w-full table-auto text-sm">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Director</th>
            <th className="px-4 py-2 text-left">Budget</th>
            <th className="px-4 py-2 text-left">Location</th>
            <th className="px-4 py-2 text-left">Duration</th>
            <th className="px-4 py-2 text-left">Year/Time</th>
            <th className="px-4 py-2 text-left">Notes</th>
            {/* ✅ Hide "Actions" column header when on /movielist */}
            {!isMovieListPage && <th className="px-4 py-2">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {filtered.length > 0 ? (
            filtered.map((row) => (
              <tr
                key={row.id}
                onClick={(e) => handleRowClick(e, row)}
                className="border-b even:bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all"
              >
                <td className="px-4 py-3">{row.title}</td>
                <td className="px-4 py-3">{row.type}</td>
                <td className="px-4 py-3">{row.director || "-"}</td>
                <td className="px-4 py-3">{row.budget || "-"}</td>
                <td className="px-4 py-3">{row.location || "-"}</td>
                <td className="px-4 py-3">{row.duration || "-"}</td>
                <td className="px-4 py-3">{row.yearOrTime || "-"}</td>
                <td className="px-4 py-3">{row.notes || "-"}</td>

                {/* ✅ Hide Edit/Delete when on /movielist */}
                {!isMovieListPage && (
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(row)}
                        className="px-2 py-1 border rounded text-sm hover:bg-gray-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => requestDelete(row)}
                        className="px-2 py-1 border rounded text-sm text-red-600 hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={isMovieListPage ? 8 : 9}
                className="text-center py-4 text-gray-500 italic"
              >
                No favorites found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
});

export default FavoriteTable;
