import { useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BusListingPage from "./pages/BusListingPage";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import PassengerPage from "./pages/PassengerPage";
import PaymentPage from "./pages/PaymentPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AuthPage from "./pages/AuthPage";

const App = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isBusListing = location.pathname === "/buses";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app-shell">
      {!isHome && (
        <header className="tourix-topbar">
          <div className="tourix-brand">
            <span className="brand-mark">◆</span>
            <div>
              <strong>GoRideX</strong>
              <small>Intercity Transfers</small>
            </div>
          </div>
          <button
            className={`menu-toggle ${menuOpen ? "active" : ""}`}
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
          <nav className={`tourix-menu ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)}>
            <Link to="/">Home</Link>
            <Link to="/buses">My Bookings</Link>
            <Link to="/buses">Offer</Link>
            <Link to="/buses">Help</Link>
            <Link to="/admin">Admin</Link>
            <Link to="/" className="menu-cta">
              Login/Register
            </Link>
          </nav>
        </header>
      )}

      <main className={`container ${isHome ? "home-container" : ""} ${isBusListing ? "listing-container" : ""}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/buses" element={<BusListingPage />} />
          <Route path="/seat/:busId" element={<SeatSelectionPage />} />
          <Route path="/passenger/:busId" element={<PassengerPage />} />
          <Route path="/payment/:bookingId" element={<PaymentPage />} />
          <Route path="/confirmation/:bookingId" element={<ConfirmationPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
