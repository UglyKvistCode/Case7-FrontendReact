import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import ShowCard from "../components/ShowCard"

export default function MovieDetailPage() {
  const { movieId } = useParams()
  const [movie, setMovie] = useState(null)
  const [shows, setShows] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const getMovie = async () => {
      try {
        const resp = await fetch(`https://cinema-api.henrybergstrom.com/api/v1/movies/${movieId}`)
        const data = await resp.json()
        setMovie(data)
      } catch (err) {
        console.log("Något gick fel", err)
      }
    }

    getMovie()
  }, [movieId])

  useEffect(() => {
    const getShows = async () => {
      try {
        const resp = await fetch(`https://cinema-api.henrybergstrom.com/api/v1/shows/movie/${movieId}`)
        const data = await resp.json()
        setShows(data)
        console.log(data)
      } catch (err) {
        console.log("Något gick fel", err)
        setErrorMessage("Kunde inte hämta föreställningar. Testa ladda om sidan.")
      } finally {
        setIsLoading(false)
      }
    }

    getShows()
  }, [movieId])

  if (isLoading) return <p>Laddar föreställningar...</p>
  if (errorMessage) return <p style={{ color: "red" }}>{errorMessage}</p>

  return (
    <main className="bg-gray-950 text-white">
      <p><Link to="/" className="text-blue-500 underline">Tillbaka till alla filmer</Link></p>

      {movie && (
        <div className="mb-6">
          {movie.posterUrl && (
            <img src={movie.posterUrl} alt={movie.title} className="w-48 rounded mb-3" />
          )}
          <h1 className="text-2xl font-bold">{movie.title}</h1>
          <p className="text-gray-400">{movie.genre} | {movie.duration} min</p>
          <p>{movie.description}</p>
        </div>
      )}

      <h2 className="text-xl font-bold">Föreställningar</h2>
      <div className="flex gap-4">
        {shows.length > 0 ? (
          shows.map(show => <ShowCard key={show._id} show={show} />)
        ) : (
          <p>Inga föreställningar hittades för den här filmen.</p>
        )}
      </div>
    </main>
  )
}