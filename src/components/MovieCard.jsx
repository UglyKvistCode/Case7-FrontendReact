import { Link } from "react-router-dom"

export default function MovieCard({ movie }) {
  return (
    <div className="border rounded p-4">
      {movie.posterUrl && (
        <img src={movie.posterUrl} alt={movie.title} className="w-32 h-auto mx-auto" />
      )}
      <h2 className="text-xl font-bold text-center">{movie.title}</h2>
      <p>{movie.genre} — {movie.duration} min</p>
      <p>{movie.description}</p>
      <Link to={`/movie/${movie._id}`} >
        Visa föreställningar
      </Link>
    </div>
  )
}