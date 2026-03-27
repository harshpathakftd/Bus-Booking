import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api";

const allSeats = Array.from({ length: 40 }, (_, i) => `S${i + 1}`);

const SeatSelectionPage = () => {
  const { busId } = useParams();
  const navigate = useNavigate();
  const [bus, setBus] = useState(null);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    api.get(`/buses/${busId}`).then((res) => setBus(res.data));
  }, [busId]);

  const toggle = (seat) => {
    setSelected((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  return (
    <section className="card">
      <div className="section-head">
        <h2>Seat Selection</h2>
        <p className="muted">Choose your preferred seats from the map.</p>
      </div>
      {!bus && <p>Loading seat map...</p>}
      {bus && (
        <>
          <div className="bus-meta">
            <p>{bus.name}</p>
            <p className="muted">
              {bus.source} to {bus.destination} | Fare: Rs {bus.fare}
            </p>
          </div>
          <div className="seats">
            {allSeats.map((seat) => {
              const booked = bus.bookedSeats.includes(seat);
              const active = selected.includes(seat);
              return (
                <button
                  key={seat}
                  disabled={booked}
                  className={`seat ${booked ? "booked" : ""} ${active ? "active" : ""}`}
                  onClick={() => toggle(seat)}
                >
                  {seat}
                </button>
              );
            })}
          </div>
          <div className="seat-summary">
            <p className="muted">
              Selected: {selected.length ? selected.join(", ") : "None"}
            </p>
          </div>
          <button
            onClick={() => navigate(`/passenger/${busId}`, { state: { selected } })}
            disabled={selected.length === 0}
            className="primary-btn"
          >
            Proceed to Passenger Details
          </button>
        </>
      )}
    </section>
  );
};

export default SeatSelectionPage;
