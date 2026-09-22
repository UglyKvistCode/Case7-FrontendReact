import { Link } from "react-router-dom"

export default function ShowCard({ show }) {
  const startTime = new Date(show.startTime).toLocaleString("sv-SE")

  return (
    <div className="border rounded p-4">
      <p>Speltid: {startTime}</p>
      <p>Sal: {show.roomNumber}</p>
      <p>Pris: {show.pricePerSeat} kr</p>
      <p>Lediga platser: {show.availableSeats?.length ?? "okänt"}</p>
      <Link to={`/book/${show._id}`} >
        Boka biljett
      </Link>
    </div>
  )
}