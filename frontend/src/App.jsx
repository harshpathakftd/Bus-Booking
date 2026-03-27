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

  return (
    <div className="app-shell">
      {!isHome && (
        <header className="topbar glass">
          <div className="brand">
            <span className="brand-dot" />
            <h1>GoRideX</h1>
          </div>
          <nav className="top-nav">
            <Link to="/">Home</Link>
            <Link to="/buses">Bus Listing</Link>
            <Link to="/admin">Admin</Link>
          </nav>
        </header>
      )}

      <main className={`container ${isHome ? "home-container" : ""}`}>
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
