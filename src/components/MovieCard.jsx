import { Link } from "react-router-dom"

export default function MovieCard({ movie }) {
  return (
    <div className="w-48 shrink-0 rounded-lg overflow-hidden bg-gray-900 p-3 flex flex-col">
      {movie.posterUrl && (
        <img src={movie.posterUrl} alt={movie.title} className="w-full h-64 object-cover rounded" />
      )}
      <div className="flex flex-col flex-1">
        <div>
          <h2 className="mt-3 text-lg font-bold">{movie.title}</h2>
          <div className="text-xs text-gray-400 mb-6">
            {movie.genre} | {movie.duration} min
          </div>
        </div>

        <Link to={`/movie/${movie._id}`} className="mt-auto">
          <p className="inline-block rounded-sm text-sm bg-yellow-600 px-4 py-2 text-gray-900">
            Visa föreställningar
          </p>
        </Link>
      </div>
    </div>
  )
}