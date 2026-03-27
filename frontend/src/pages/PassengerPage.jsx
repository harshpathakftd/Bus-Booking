import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { api, withAuth } from "../api";

const PassengerPage = () => {
  const { busId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const seats = state?.selected || [];
  const [passenger, setPassenger] = useState({ name: "", age: "", gender: "Male" });
  const [token, setToken] = useState("");

  const bookNow = async (e) => {
    e.preventDefault();
    const res = await api.post(
      "/bookings",
      {
        busId,
        seats,
        passengers: [{ ...passenger, age: Number(passenger.age) }]
      },
      withAuth(token)
    );
    navigate(`/payment/${res.data._id}`);
  };

  return (
    <section className="card">
      <div className="section-head">
        <h2>Passenger Details</h2>
        <p className="muted">Fill traveler details and confirm booking.</p>
      </div>
      <p className="muted">Seats: {seats.join(", ") || "No seats selected"}</p>
      <form onSubmit={bookNow} className="grid form-grid">
        <input
          placeholder="JWT token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <input
          placeholder="Name"
          value={passenger.name}
          onChange={(e) => setPassenger({ ...passenger, name: e.target.value })}
          required
        />
        <input
          placeholder="Age"
          type="number"
          value={passenger.age}
          onChange={(e) => setPassenger({ ...passenger, age: e.target.value })}
          required
        />
        <select
          value={passenger.gender}
          onChange={(e) => setPassenger({ ...passenger, gender: e.target.value })}
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <button type="submit" disabled={seats.length === 0 || !token} className="primary-btn">
          Proceed to Payment
        </button>
      </form>
    </section>
  );
};

export default PassengerPage;
