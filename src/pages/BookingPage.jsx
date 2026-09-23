import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import BookingForm from "../components/BookingForm"

export default function BookingPage({ setConfirmedBooking }) {
  const { showId } = useParams()
  const navigate = useNavigate()
  const [show, setShow] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const getShow = async () => {
      try {
        const resp = await fetch(`https://cinema-api.henrybergstrom.com/api/v1/shows/${showId}`)
        const data = await resp.json()
        setShow(data)
      } catch (err) {
        console.log("Something went wrong", err)
        setErrorMessage("Kunde inte hämta föreställningen.")
      } finally {
        setIsLoading(false)
      }
    }

    getShow()
  }, [showId])

  const handleBookingComplete = (booking) => {
    setConfirmedBooking(booking)
    navigate("/confirm")
  }

  if (isLoading) return <p className="text-center text-white bg-gray-950 min-h-screen pt-12">Laddar...</p>
  if (errorMessage) return <p className="text-center text-red-500 bg-gray-950 min-h-screen pt-12">{errorMessage}</p>
  if (!show) return <p className="text-center text-white bg-gray-950 min-h-screen pt-12">Föreställningen hittades inte.</p>

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-yellow-500 mb-6 text-center">Boka biljett</h1>
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <BookingForm show={show} onBookingComplete={handleBookingComplete} />
        </div>
      </div>
    </main>
  )
}