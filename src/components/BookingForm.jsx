import { useState } from "react"

export default function BookingForm({ show, onBookingComplete }) {
  const [selectedSeat, setSelectedSeat] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedSeat || !email || !name) return

    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const resp = await fetch("https://cinema-api.henrybergstrom.com/api/v1/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          show: show._id,
          seats: [selectedSeat],
        }),
      })

      if (!resp.ok) throw new Error("Hoppsan! Någon snodde biljetten.")

      const booking = await resp.json()
      onBookingComplete(booking)
    } catch (err) {
      console.log("Something went wrong", err)
      setErrorMessage("Oj då, bokningen skällde ifrån. Försök igen.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label>
        Namn:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-stone-800 rounded-2xl"
        />
      </label>

      <label>
        Välj liggplats:
        <select value={selectedSeat} onChange={(e) => setSelectedSeat(e.target.value)}>
          <option value="">-- Välj --</option>
          {show.availableSeats.map(seat => (
            <option key={seat} value={seat}>{seat}</option>
          ))}
        </select>
      </label>

      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-stone-800 rounded-2xl"
        />
      </label>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Vallar in din bokning..." : "Boka en liggplats"}
      </button>
    </form>
  )
}