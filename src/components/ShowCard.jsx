import { Link } from "react-router-dom"

export default function ShowCard({ show }) {
  const startTime = new Date(show.startTime).toLocaleString("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="border rounded p-4">
      <h2>{show.movie.title}</h2>
      <p>Speltid: {startTime}</p>
      <p>Sal: {show.roomNumber}</p>
      <p>Pris: {show.pricePerSeat} kr</p>
      <p>Lediga platser: {show.availableSeats?.length ?? "okänt"}</p>
      <Link to={`/book/${show._id}`} className="inline-block border border-gray-700 rounded-lg px-4 py-2 hover:bg-gray-700 hover:text-white transition">
        Boka biljett
      </Link>
    </div>
  )
}