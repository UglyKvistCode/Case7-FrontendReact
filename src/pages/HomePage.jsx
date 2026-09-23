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
    <>
    <header>
      <img className="w-full h-[480px] object-cover" src="https://cdn.publisher-live.etc.nu/swp/uc3g8l/media/20211110161156_0d42f06dcc2c7c5cd828f4d6f516247712c0024b00a31fa3409456aabf33cfda.jpg"/>
    </header>
    <main className="bg-gray-950 text-white p-12">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-500">På bio just nu:</h1>
      <div className="flex gap-6 flex-wrap text-white p-8 justify-center w-2/3 m-auto">
      {movies.map(movie => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
      </div>
    </main>
    </>
  )
}