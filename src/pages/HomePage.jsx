import { useState, useEffect } from "react"
import MovieCard from "../components/MovieCard"

export default function HomePage() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const getMovies = async () => {
      try {
        const resp = await fetch("https://cinema-api.henrybergstrom.com/api/v1/movies")
        const data = await resp.json()
        setMovies(data)
      } catch (err) {
        console.log("Något gick fel", err)
        setErrorMessage("Filmerna verkar ha rymt. Testa att ladda om sidan.")
      } finally {
        setIsLoading(false)
      }
    }

    getMovies()
  }, [])

  if (isLoading) return <p>Labradoren hämtar filmerna.</p>
  if (errorMessage) return <p style={{ color: "red" }}>{errorMessage}</p>

  return (
    <main>
      <h1 className="text-3xl font-bold">Bettys Biograf</h1>
      <div className="flex gap-4 overflow-auto">
      {movies.map(movie => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
      </div>
    </main>
  )
}