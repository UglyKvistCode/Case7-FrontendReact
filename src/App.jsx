import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import BookingPage from "./pages/BookingPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movie/:movieId" element={<MovieDetailPage />} />
      <Route
        path="/book/:showId"
        element={<BookingPage setConfirmedBooking={setConfirmedBooking} />}
      />
      <Route
        path="/confirm"
        element={<ConfirmationPage booking={confirmedBooking} />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;