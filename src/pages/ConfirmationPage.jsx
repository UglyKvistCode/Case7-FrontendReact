import { Link } from "react-router-dom"
import ConfirmationCard from "../components/ConfirmationCard"

export default function ConfirmationPage({ booking }) {
  if (!booking) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-4">
        <p>Ingen bokning att visa — har du redan bokat?</p>
        <Link to="/" className="text-blue-500 underline">Tillbaka till alla filmer</Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-md">
        <ConfirmationCard booking={booking} />

        <div className="mt-8 bg-gray-900 border border-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-bold text-yellow-500 mb-4 text-center">
            Trivselregler
          </h2>

          <ul className="space-y-3 text-sm text-gray-300">
            <li>
              <strong className="text-white">Eget tuggben är tillåtet att ta med.</strong>{" "}
              Att dela med sig är frivilligt.
            </li>
            <li>
              <strong className="text-white">Det är inte tillåtet att idka älskog med grannhunden.</strong>{" "}
              Vi ber er hålla tassarna i styr.
            </li>
            <li>
              <strong className="text-white">Fisa under föreställningen undanbedes.</strong>{" "}
              Biografens ventilation har sina begränsningar.
            </li>
            <li>
              <strong className="text-white">Att stirra på grannens godis är tillåtet.</strong>{" "}
              Att stjäla det är det inte.
            </li>
            <li>
              <strong className="text-white">Skällande är tillåtet i måttlig mängd.</strong>{" "}
              Högljudda diskussioner om filmens handling hänvisas till foajén.
            </li>
          </ul>

          <p className="mt-6 text-center text-xs text-gray-400 italic">
            Vi påminner våra fyrbenta gäster om att biografen är en plats för film,
            snacks och gemenskap — inte för slagsmål, stölder eller romantiska
            eskapader. Tack för att ni håller tassarna i styr!
          </p>
        </div>

        <p className="mt-6 text-center">
          <Link to="/" className="text-blue-500 underline">
            Boka en till biljett
          </Link>
        </p>
      </div>
    </main>
  )
}