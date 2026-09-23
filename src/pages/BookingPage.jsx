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

  if (isLoading) return <p>Laddar...</p>
  if (errorMessage) return <p style={{ color: "red" }}>{errorMessage}</p>
  if (!show) return <p>Föreställningen hittades inte.</p>

  return (
    <div className="bg-gray-900 text-white">
    <main> 
      <h1 className="font-bold">Boka biljett</h1>
      <BookingForm show={show} onBookingComplete={handleBookingComplete} />
    </main>
    </div>
  )
}