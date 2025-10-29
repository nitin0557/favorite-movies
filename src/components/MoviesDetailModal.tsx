import React from "react";
import { type Favorite } from "../types/types";

interface MovieDetailModalProps {
  movie: Favorite | null;
  onClose: () => void;
}

const MovieDetailModal: React.FC<MovieDetailModalProps> = React.memo(({
  movie,
  onClose,
}) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4">{movie.title}</h2>

        <div className="space-y-2">
          <img
            src={movie.posterUrl ?? ""}
            alt={movie.title}
            className="rounded-md w-full mb-3"
          />
          <p>
            <strong>Type:</strong> {movie.type}
          </p>
          <p>
            <strong>Director:</strong> {movie.director}
          </p>
          <p>
            <strong>Duration:</strong> {movie.duration}
          </p>
          <p>
            <strong>Year:</strong> {movie.yearOrTime}
          </p>
          <p>
            <strong>Notes:</strong> {movie.notes}
          </p>
        </div>
      </div>
    </div>
  );
});

export default MovieDetailModal;
