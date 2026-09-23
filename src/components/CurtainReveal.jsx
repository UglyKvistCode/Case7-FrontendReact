import { useState, useEffect } from "react"

export default function CurtainReveal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const pleatStyle = {
    backgroundImage: `repeating-linear-gradient(
      90deg,
      #3d0505 0px,
      #5c0a0a 10px,
      #3d0505 20px,
      #2b0303 30px,
      #3d0505 40px
    )`,
  }

  return (
    <div className="relative w-full h-150 overflow-hidden bg-black">
      {/* Videon som syns bakom gardinerna */}
      <video
       className="absolute inset-0 w-full h-full object-cover"
        src="/videos/dog-trailer.mp4"
        autoPlay
        muted={isMuted}
        loop
        playsInline
      />

      {/* Ljud-knapp */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded z-20"
      >
        {isMuted ? "🔇 Slå på ljud" : "🔊 Stäng av ljud"}
      </button>

      {/* Text ovanpå videon */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-yellow-500 text-lg font-bold bg-black/50 px-4 py-1 rounded z-10">
        Kommande film
      </div>

      {/* Vänster gardin */}
      <div
        className={`absolute top-0 left-0 h-full w-1/2 shadow-2xl transition-transform duration-3000 ease-in-out ${
          isOpen ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{
          ...pleatStyle,
          borderBottomRightRadius: "60% 15%",
        }}
      />

      {/* Höger gardin */}
      <div
        className={`absolute top-0 right-0 h-full w-1/2 shadow-2xl transition-transform duration-3000 ease-in-out ${
          isOpen ? "translate-x-full" : "translate-x-0"
        }`}
        style={{
          ...pleatStyle,
          borderBottomLeftRadius: "60% 15%",
        }}
      />
    </div>
  )
}