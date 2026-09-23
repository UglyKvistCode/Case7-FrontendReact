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

  if (isLoading) return <p className="text-center text-white bg-gray-950 min-h-screen pt-12">Laddar föreställningar...</p>
  if (errorMessage) return <p className="text-center text-red-500 bg-gray-950 min-h-screen pt-12">{errorMessage}</p>

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-md">
        <p className="mb-6">
          <Link to="/" className="text-blue-500 underline">Tillbaka till alla filmer</Link>
        </p>

        {movie && (
          <div className="mb-8 bg-gray-900 border border-gray-700 rounded-lg p-6 text-center">
            {movie.posterUrl && (
              <img src={movie.posterUrl} alt={movie.title} className="w-48 rounded mb-4 mx-auto" />
            )}
            <h1 className="text-2xl font-bold">{movie.title}</h1>
            <p className="text-gray-400 mb-3">{movie.genre} | {movie.duration} min</p>
            <p className="text-sm">{movie.description}</p>
          </div>
        )}

        <h2 className="text-xl font-bold text-yellow-500 mb-4 text-center">Föreställningar</h2>
        <div className="flex flex-col gap-4">
          {shows.length > 0 ? (
            shows.map(show => <ShowCard key={show._id} show={show} />)
          ) : (
            <p className="text-center">Inga föreställningar hittades för den här filmen.</p>
          )}
        </div>
      </div>
    </main>
  )
}