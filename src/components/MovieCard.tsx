interface Props {
  movie: any;
  onAddFavorite: () => void;
}

export default function MovieCard({ movie, onAddFavorite }: Props) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={movie.posterUrl} alt={movie.title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{movie.title}</h3>
        <p className="text-sm text-gray-600">{movie.director}</p>
        <p className="text-sm text-gray-500">{movie.yearOrTime}</p>
        <button
          onClick={onAddFavorite}
          className="mt-3 bg-blue-600 text-white px-3 py-1 rounded"
        >
          Add to Favorites
        </button>
      </div>
    </div>
  );
}
