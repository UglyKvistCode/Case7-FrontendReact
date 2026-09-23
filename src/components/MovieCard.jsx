import { Link } from "react-router-dom"

export default function MovieCard({ movie }) {
  return (
    <div className="w-48 shrink-0 rounded-lg overflow-hidden bg-gray-900 p-3">
      {movie.posterUrl && (
        <img src={movie.posterUrl} alt={movie.title} className="w-full h-64 object-cover rounded" />
      )}
      <h2 className="mt-3 text-lg font-bold text-center">{movie.title}</h2>
      <p>{movie.genre}</p> 
      <p>{movie.duration} min</p>
      <p>{movie.description}</p>
      <Link to={`/movie/${movie._id}`} >
        <p className="text-yellow-600"> Visa föreställningar</p>
      </Link>
    </div>
  )
}