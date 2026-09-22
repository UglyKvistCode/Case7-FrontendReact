export default function ConfirmationCard({ booking }) {
  if (!booking) return null

  return (
    <div className="border rounded p-4">
      <h2 className="text-xl font-bold">Din liggplats är bokad!</h2>
      <p>Email: {booking.email}</p>
      <p>Säten: {booking.seats?.join(", ")}</p>
      <p>Totalpris: {booking.totalPrice} kr</p>
      <p>Bokad: {new Date(booking.bookingTime).toLocaleString("sv-SE")}</p>
    </div>
  )
}