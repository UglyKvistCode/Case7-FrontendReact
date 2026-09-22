import { Link } from "react-router-dom"
import ConfirmationCard from "../components/ConfirmationCard"

export default function ConfirmationPage({ booking }) {
  if (!booking) {
    return (
      <main>
        <p>Ingen bokning att visa — har du redan bokat?</p>
        <p><Link to="/" className="text-blue-500 underline">Tillbaka till alla filmer</Link></p>
      </main>
    )
  }

  return (
    <main>
      <ConfirmationCard booking={booking} />
      <p><Link to="/" className="text-blue-500 underline">Boka en till biljett</Link></p>
    </main>
  )
}