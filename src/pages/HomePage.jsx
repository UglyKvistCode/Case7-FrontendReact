import { useState, useEffect } from "react"
import MovieCard from "../components/MovieCard"
import CurtainReveal from "../components/CurtainReveal"

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
<h1 className="text-4xl font-bold text-yellow-500 text-center py-6 bg-gray-950">
  Bettys HundBiograf
</h1>

<CurtainReveal />
    <main className="bg-gray-950 text-white p-12">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-500">På bio just nu:</h1>
      <div className="flex gap-6 flex-wrap text-white p-8 justify-center m-auto">
      {movies.map(movie => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
      </div>
      <section className="bg-gray-900 text-white p-8 mt-8 rounded-lg text-center">
  <h2 className="text-2xl font-bold text-yellow-500 mb-4">I varje liggplats ingår:</h2>
  <div className="flex flex-wrap justify-center gap-6 text-lg">
    <p>🍿 Pupcorn</p>
    <p>🛏️ Mysig filt</p>
    <p>🍺 Hundöl</p>
  </div>
  <p className="mt-6 text-gray-300">
    Småhundar och valpar kan be om en extra kudde. <br />
    Extra sköna kuddar finns för våra äldre gäster.
  </p>
</section>
    </main>
    </>
  )
}