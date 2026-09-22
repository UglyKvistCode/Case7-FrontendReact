import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import ShowCard from "../components/ShowCard"

export default function MovieDetailPage() {
  const { movieId } = useParams()
  const [shows, setShows] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const getShows = async () => {
      try {
        const resp = await fetch(`https://cinema-api.henrybergstrom.com/api/v1/shows/movie/${movieId}`)
        const data = await resp.json()
        setShows(data)
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
    <main>
      <h1 className="text-2xl font-bold">Föreställningar</h1>
      <p><Link to="/" className="text-blue-500 underline">Tillbaka till alla filmer</Link></p>
      {shows.length > 0 ? (
        shows.map(show => <ShowCard key={show._id} show={show} />)
      ) : (
        <p>Inga föreställningar hittades för den här filmen.</p>
      )}
    </main>
  )
}